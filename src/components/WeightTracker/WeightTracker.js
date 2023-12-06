import useFetch from '../../hooks/useFetch';
import { useUser } from '../../hooks/UserContext';
import WeightForm from './WeightForm';
import WeightData from './WeightData';
import { useRef, useState, useEffect } from 'react';
import { postWeightData } from '../../api/api';
import formatDate from '../../utils/formatDate';
import convertToUnit from '../../utils/convertToUnit';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function WeightTracker() {
    const { user } = useUser();
    const { loading, data: weightData, error } = useFetch(`/users/${user?.id}/weight`);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState('');
    const dateRef = useRef();
    const weightRef = useRef(0);
    const [editing, setEditing] = useState(false);
    const [formattedData, setFormattedData] = useState(null);
    const { storedValue: inKilos, setValue: setInKilos } = useLocalStorage('inKilos');
    const [filter, setFilter] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    useEffect(() => {
       if (weightData) {
            setFormattedData(weightData.weightList.map(data => {
                const date = formatDate(data.date);
                const dateFormatted = `${date.day}/${date.month}/${date.year}`;
                return {
                    dateFormatted,
                    date,
                    weight: !inKilos ? Number(data.weight) : convertToUnit(data.weight, 'kg')
                };
            }));
       }
    }, [weightData, inKilos]);

    const handleSubmit = async e => {
        e.preventDefault(e);
        setSubmitting(true);
        const weight = !inKilos ? Number(weightRef.current.value) : convertToUnit(weightRef.current.value, 'lbs');
        const result = await postWeightData(user.id, weight, dateRef.current.value);
        if (!result) setFormError('Submission failed');
        setSubmitting(false);
    };

    return (
        <>
            <h1>Track Weight</h1>
            <label htmlFor="units">Select Measurement</label>
            <select id="units" defaultValue={inKilos} onChange={e => setInKilos(JSON.parse(e.target.value))}>
                <option key="1" value={false}>lbs</option>
                <option key="2" value={true}>kg</option>
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