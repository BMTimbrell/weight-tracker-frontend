import isPositiveNumber from '../../utils/isPositiveNumber';
import { postWeightData, updateWeightData } from '../../api/api';
import convertToUnit from '../../utils/convertToUnit';
import { useUserContext } from '../../hooks/UserContext';
import { useThemeContext } from '../../hooks/ThemeContext';
import { useState } from 'react';

export default function WeightForm({ 
    weightRef, 
    dateRef, 
    submitting, 
    setSubmitting, 
    inKilos, 
    buttonText = "Submit", 
    dataId = 0, 
    setEditing = null,
    children
}) {
    const { user } = useUserContext();
    const [error, setError] = useState('');
    const [theme] = useThemeContext();

    const handleSubmit = async (e, dataId) => {
        e.preventDefault(e);
        setError('');
        if (!isPositiveNumber(weightRef.current.value)) {
            setError('You must enter a positive number for weight');
            return;
        }
        setSubmitting(true);
        const weight = !inKilos ? Number(weightRef.current.value) : convertToUnit(weightRef.current.value, 'lbs');
        const result = !dataId ? 
            await postWeightData(user.id, weight, dateRef.current.value) : 
            await updateWeightData(user.id, dataId, weight, dateRef.current.value);
        setSubmitting(false);
        if (setEditing) setEditing(false);
        weightRef.current.value = null;
        dateRef.current.value = null;
        if (!result) setError('Submission failed');
    };

    return (
        <form className="form" style={{maxWidth: '20rem'}} onSubmit={e => handleSubmit(e, dataId)}>
            <div className="weight-fields">
                <label htmlFor="weight">Enter Weight: </label>
                <input 
                    ref={weightRef}
                    type="text"
                    id="weight"
                    className={`${theme} input`}
                    style={{width: '100%'}} 
                    placeholder={'weight in ' + (inKilos ? 'kg' : 'lbs')}
                    required 
                />

                <label htmlFor="date">Enter Date: </label>
                <input 
                    ref={dateRef} 
                    type="date" 
                    id="date"
                    className={`${theme} input`}
                    min="2000-01-01" 
                    max="2100-12-31"
                    required 
                />
            </div>

            <button className={`${theme} btn`} type="submit" disabled={submitting}>{buttonText}</button>
            {children}
            <p className={error ? 'error' : 'hidden'}>{error}</p>
        </form>
    );
}