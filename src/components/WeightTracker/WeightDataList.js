import WeightData from './WeightData';
import { useState } from 'react';

export default function WeightDataList({ 
    data, 
    inKilos, 
    dateRef, 
    weightRef, 
    submitting, 
    setSubmitting 
}) {
    const [updating, setUpdating] = useState({id: 0});

    return (
        <>
            {data.map(el => (
                <WeightData 
                    key={el.id}
                    dataId={el.id}
                    inKilos={inKilos}
                    dateRef={dateRef}
                    weightRef={weightRef}
                    submitting={submitting}
                    setSubmitting={setSubmitting}
                    updating={updating}
                    setUpdating={setUpdating}
                >
                    <p>Weight: {el.weight}{!inKilos ? 'lbs' : 'kg'}</p>
                    <p>Date: {el.dateFormatted}</p>
                </WeightData>
            ))}
        </>
    );  
}