
export default function WeightForm({ weightRef, dateRef, handleSubmit, submitting, error, setError, inKilos }) {
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="weight">Enter Weight: </label>
            <input 
                ref={weightRef}
                type="text"
                id="weight" 
                placeholder={'weight in ' + (inKilos ? 'kg' : 'lbs')}
                required 
            />
            <label htmlFor="date">Enter Date: </label>
            <input 
                ref={dateRef} 
                type="date" 
                id="date"
                min="2000-01-01" 
                max="2100-12-31"
                required 
            />
            <button type="submit" disabled={submitting}>Submit Weight</button>
            {error}
        </form>
    );
}