const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
}

const starContainerStyle = {
    display: 'flex',
    gap: '4px'
}

const textStyle = {
    lineHeight: '1',
    margin: '0'
};

export default function StarRating({maxRating = 5}) { // default props - 구조분해할당하면 default값 정할 수 있음.

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length: maxRating}, (_, i) => <span>S{i + 1}</span>)}
            </div>
            <p style={textStyle}>10</p>
        </div>
    );
};