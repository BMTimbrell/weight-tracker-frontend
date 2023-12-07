import useFetch from '../../hooks/useFetch';
import { useUser } from '../../hooks/UserContext';
import WeightForm from './WeightForm';
import WeightData from './WeightData';
import { useRef, useState, useEffect } from 'react';
import { postWeightData } from '../../api/api';
import formatDate from '../../utils/formatDate';
import convertToUnit from '../../utils/convertToUnit';
import isPositiveNumber from '../../utils/isPositiveNumber';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function WeightTracker() {
    const { user } = useUser();
    const [editing, setEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { loading, data: weightData, error } = useFetch(`/users/${user?.id}/weight`, {}, [editing, submitting]);
    const [formError, setFormError] = useState('');
    const dateRef = useRef();
    const weightRef = useRef(0);
    const [formattedData, setFormattedData] = useState(null);
    const [years, setYears] = useState([]);
    const { storedValue: inKilos, setValue: setInKilos } = useLocalStorage('inKilos');
    const [filter, setFilter] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    useEffect(() => {
       if (weightData) {
            //Get list of years to use in filtering
            setYears(weightData.weightList
                .map(data => formatDate(data.date).year)
                .filter((data, index, array) => array.indexOf(data) === index)
            );
            //Format data for easy use for graph and filtering
            setFormattedData(weightData.weightList
                .filter(data => {
                    if (!filter.year) return true;
                    const date = formatDate(data.date);
                    if (date.year === filter.year) {
                        return !filter.month || date.month === filter.month;
                    }
                    return false;
                })
                .map(data => {
                    const date = formatDate(data.date);
                    const dateFormatted = `${date.day}/${date.month}/${date.year}`;
                    return {
                        dateFormatted,
                        date,
                        weight: !inKilos ? Number(data.weight) : convertToUnit(data.weight, 'kg')
                    };
                })
            );
       }
    }, [weightData, inKilos, filter]);

    const handleSubmit = async e => {
        e.preventDefault(e);
        if (!isPositiveNumber(weightRef.current.value)) {
            setFormError('You must enter a positive number for weight');
            return;
        }
        setSubmitting(true);
        const weight = !inKilos ? Number(weightRef.current.value) : convertToUnit(weightRef.current.value, 'lbs');
        const result = await postWeightData(user.id, weight, dateRef.current.value);
        setSubmitting(false);
        weightRef.current.value = null;
        dateRef.current.value = null;
        if (!result) setFormError('Submission failed');
    };

    const generateMonthOptions = () => {
        const months = [];
        for (let i = 1; i < 13; i++) {
            months.push(i);
        }
        return months.map(month => 
            <option key={month} value={month}>{month}</option>
        );
    };

    return (
        <>
            <h1>Track Weight</h1>
            <label htmlFor="units">Select Measurement: </label>
            <select id="units" defaultValue={inKilos} onChange={e => setInKilos(JSON.parse(e.target.value))}>
                <option key="1" value={false}>lbs</option>
                <option key="2" value={true}>kg</option>
            </select>
            <label htmlFor="year">Filter by year: </label>
            <select id="year" value={filter.year} onChange={e => setFilter(prev => ({...prev, year: Number(e.target.value)}))}>
                <option key="none" value={0}>Any</option>
                {years.map(year => 
                    <option key={year} value={year}>{year}</option>
                )}
            </select>
            <label htmlFor="month">Filter by month: </label>
            <select id="month" value={filter.month} onChange={e => setFilter(prev => ({...prev, month: Number(e.target.value)}))}>
                <option key="none" value={0}>Any</option>
                {generateMonthOptions()}
            </select>
            {loading && <h2>Loading...</h2>}
            {weightData?.weightList?.length < 1 &&
                <p>You haven't submitted any data yet.</p>
            }

            {weightData?.weightList?.length > 0 && !editing && formattedData &&
                <LineChart
                width={500}
                height={300}
                data={formattedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            }

            {weightData?.weightList?.length > 0 && editing &&
                <WeightData data={weightData.weightList} />
            }
            <h2>Submit Weight</h2>
            <WeightForm 
                dateRef={dateRef} 
                weightRef={weightRef} 
                handleSubmit={handleSubmit} 
                submitting={submitting}
                error={formError}
                setError={setFormError} 
                inKilos={inKilos}
            />
        </>
    );
}