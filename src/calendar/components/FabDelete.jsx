import { useCalendarStore, } from "../../hooks"

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore();

    const onClickButton = () => {
        startDeleteEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={onClickButton}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
