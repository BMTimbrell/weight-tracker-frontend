
export default function WeightData({ data }) {
    return (
        <>
            {data.map(el => (
                <div key={el.id}>
                    <p>Weight: {el.weight}lbs</p>
                    <p>Date: {el.date}</p>
                </div>
            ))}
        </>
    );

    
}