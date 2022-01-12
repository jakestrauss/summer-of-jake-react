export default function PhotoSlide(image) {
    return (
        <div className="each-slide">
            <div style={{'backgroundImage': `url(${image.image})`}}>
            </div>
        </div>
    )
}