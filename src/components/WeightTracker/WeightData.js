import { useState, useEffect } from 'react';
import WeightForm from './WeightForm';
import { deleteWeightData } from '../../api/api';
import { useUserContext } from '../../hooks/UserContext';
import { useThemeContext } from '../../hooks/ThemeContext';

export default function WeightData({ children, dataId, updating, setUpdating, inKilos, dateRef, weightRef, submitting, setSubmitting }) {
    const [editing, setEditing] = useState(updating.id === dataId);
    const { user } = useUserContext();
    const [error, setError] = useState('');
    const [theme] = useThemeContext();

    useEffect(() => {
        setEditing(updating.id === dataId);
    }, [updating, dataId]);

    return (
        <>
            {!editing ? (
                <>
                    {children}
                    {error}
                    <button 
                        className={`${theme} btn`}
                        onClick={() => setUpdating({id: dataId})} 
                        disabled={submitting}
                    >
                        Edit
                    </button>
                    <button 
                        className={`${theme} btn delete`}
                        onClick={async () => {
                            setSubmitting(true);
                            const result = await deleteWeightData(user.id, dataId);
                            if (!result) setError('Failed to remove weight');
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
                    <button 
                        className={`${theme} btn`} 
                        onClick={() => setEditing(false)} 
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                </>
                
            )}
        </>
    );
}