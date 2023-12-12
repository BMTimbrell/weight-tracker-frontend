import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../hooks/UserContext';
import WeightForm from './WeightForm';
import WeightDataList from './WeightDataList';
import { useRef, useState, useEffect } from 'react';
import formatDate from '../../utils/formatDate';
import convertToUnit from '../../utils/convertToUnit';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useThemeContext} from '../../hooks/ThemeContext';
import { Link } from 'react-router-dom';

export default function WeightTracker() {
    const { user } = useUserContext();
    const [theme] = useThemeContext();
    const [editing, setEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { loading, data: weightData, error } = useFetch(
        user && `/users/${user?.id}/weight`,
        {},
        [editing, submitting]
    );
    const dateRef = useRef();
    const weightRef = useRef(0);
    const [formattedData, setFormattedData] = useState(null);
    const [years, setYears] = useState([]);
    const { value: inKilos, setValue: setInKilos } = useLocalStorage('inKilos', false);
    const { value: filter, setValue: setFilter } = useLocalStorage('filter', {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (weightData?.authorisationFailed) {
            navigate('/logout');
            return;
        }
        
        if (weightData) {
            //Get list of years to use in filtering
            setYears(weightData.weightList
                .map(data => formatDate(data.date).year)
                .filter((data, index, array) => array.indexOf(data) === index)
            );
            //Format data for easy use for graph and filtering
            setFormattedData(weightData.weightList
                .filter(data => {
                    const date = formatDate(data.date);
                    if (!filter.year) return !filter.month || date.month === filter.month;
                    if (date.year === filter.year) {
                        return !filter.month || date.month === filter.month;
                    }
                    return false;
                })
                .map(data => {
                    const date = formatDate(data.date);
                    const dateFormatted = `${date.day}/${date.month}/${date.year}`;
                    return {
                        id: data.id,
                        dateFormatted,
                        date,
                        weight: !inKilos ? Number(data.weight) : convertToUnit(data.weight, 'kg')
                    };
                })
            );
       }
    }, [weightData, inKilos, filter, navigate]);

    const generateMonthOptions = () => {
        const months = [];
        for (let i = 1; i < 13; i++) {
            months.push(i);
        }
        return months.map(month => 
            <option key={month} value={month}>{month}</option>
        );
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload?.length) {
            return (
                <div className="tooltip">
                    <p className="p">{label}</p>
                    <p className="p">
                        Weight: {payload[0].value + (inKilos ? 'kg' : 'lbs')}
                    </p>
                </div>
            );
        }
    };

    if (!user) return (
        <>
            <h1 className="h1">Track Your Weight</h1>
            <p className="p">You must <Link className="link" to="/login">log in</Link> to track your weight.</p>
            <p className="p">Don't have an account? <Link className="link" to="/register">Click here</Link> to register.</p>
        </>
    );

    return (
        <>
            <h1 className="h1">Track Your Weight</h1>
            <div className="flex filters">
                <div className="flex">
                    <label htmlFor="units">Select Measurement: </label>
                    <select
                        className={`${theme} select`} 
                        id="units" 
                        defaultValue={inKilos} 
                        onChange={e => setInKilos(JSON.parse(e.target.value))}
                    >
                        <option key="1" value={false}>lbs</option>
                        <option key="2" value={true}>kg</option>
                    </select>
                </div>
                
                <div className="flex">
                <label htmlFor="year">Filter by year: </label>
                    <select
                        className={`${theme} select`} 
                        id="year" 
                        value={filter.year} 
                        onChange={e => setFilter(prev => ({...prev, year: Number(e.target.value)}))}
                    >
                        <option key="none" value={0}>Any</option>
                        {years.map(year => 
                            <option key={year} value={year}>{year}</option>
                        )}
                    </select>
                </div>
                
                <div className="flex">
                    <label htmlFor="month">Filter by month: </label>
                    <select
                        className={`${theme} select`} 
                        id="month" 
                        value={filter.month} 
                        onChange={e => setFilter(prev => ({...prev, month: Number(e.target.value)}))}
                    >
                        <option key="none" value={0}>Any</option>
                        {generateMonthOptions()}
                    </select>
                </div>
            </div>
            
            
            {loading && <h2 className="h2 margin-top">Loading...</h2>}
            {error && <h2 className="error">Failed to load data</h2>}
            {weightData?.weightList?.length < 1 &&
                <p className="p margin-top margin-bottom">You haven't submitted any data yet.</p>
            }

            {weightData?.weightList?.length > 0 && !editing && formattedData &&
                <ResponsiveContainer 
                    width="100%" 
                    aspect={3} 
                    style={{
                        margin: '2rem 0', 
                        backgroundColor: 'white', 
                        borderRadius: '0.25rem', 
                        paddingTop: '1rem', 
                        paddingBottom: '1rem', 
                        paddingRight: '1.5rem'
                        }}
                    >
                <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
              </ResponsiveContainer>
            }

            {weightData?.weightList?.length > 0 && 
                <button className={`${theme} btn`} onClick={() => setEditing(!editing)} style={!editing ? {marginBottom: '2.5rem'} : {margin: '2rem 0'}}>
                    {!editing ? 'Edit Weight Data' : 'Go Back'}
                </button>
            }

            {weightData?.weightList?.length > 0 && editing &&
                <WeightDataList 
                    data={formattedData} 
                    dateRef={dateRef} 
                    weightRef={weightRef}  
                    submitting={submitting}
                    setSubmitting={setSubmitting}
                    inKilos={inKilos} 
                    buttonText="Save Changes"
                />
            }

            {!editing && (
                <>
                    <h2 className="h2">Submit Weight</h2>
                    <WeightForm 
                        dateRef={dateRef} 
                        weightRef={weightRef} 
                        submitting={submitting}
                        setSubmitting={setSubmitting}
                        inKilos={inKilos}
                        buttonText="Submit Weight"
                    />
                </>
            )}
            
        </>
    );
}