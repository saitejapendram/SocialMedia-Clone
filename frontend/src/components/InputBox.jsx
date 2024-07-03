export const InputBox = ({label, placeholder}) => {
    return (
        <div>
            <label >{label}</label>
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}