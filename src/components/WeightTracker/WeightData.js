import { useState, useEffect } from 'react';
import WeightForm from './WeightForm';

export default function WeightData({ children, dataId, updating, setUpdating, inKilos, dateRef, weightRef, submitting, setSubmitting }) {
    const [editing, setEditing] = useState(updating.id === dataId);

    useEffect(() => {
        setEditing(updating.id === dataId);
    }, [updating]);

    return (
        <>
            {!editing ? (
                <>
                    {children}
                    <button onClick={() => setUpdating({id: dataId})}>Edit</button>
                    <button>Delete</button>
                </>
            ) : (
                <>
                    <WeightForm
                        inKilos={inKilos}
                        dateRef={dateRef}
                        weightRef={weightRef}
                        submitting={submitting}
                        setSubmitting={setSubmitting}
                        buttonText="Save Changes"
                        dataId={dataId}
                        setEditing={setEditing}
                    />
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </>
                
            )}
        </>
    );
}