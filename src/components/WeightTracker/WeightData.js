import { useState, useEffect } from 'react';
import WeightForm from './WeightForm';
import { deleteWeightData } from '../../api/api';
import { useUser } from '../../hooks/UserContext';

export default function WeightData({ children, dataId, updating, setUpdating, inKilos, dateRef, weightRef, submitting, setSubmitting }) {
    const [editing, setEditing] = useState(updating.id === dataId);
    const { user } = useUser();

    useEffect(() => {
        setEditing(updating.id === dataId);
    }, [updating]);

    return (
        <>
            {!editing ? (
                <>
                    {children}
                    <button 
                        onClick={() => setUpdating({id: dataId})} 
                        disabled={submitting}
                    >
                        Edit
                    </button>
                    <button 
                        onClick={async () => {
                            setSubmitting(true);
                            await deleteWeightData(user.id, dataId);
                            setSubmitting(false);
                        }}
                        disabled={submitting}
                    >
                        Delete
                    </button>
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
                    <button onClick={() => setEditing(false)} disabled={submitting}>
                        Cancel
                    </button>
                </>
                
            )}
        </>
    );
}