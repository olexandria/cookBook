import './delete-recipe.style.scss'

const DialogDeleteRecipe = ({onDialog}) => {
    return (
        <div className="delete-dialog-container" onClick={() => onDialog(false)}>
            <div className="dialog-content-container" onClick={(e) => e.stopPropagation()}>
                <h3 className="message-style">Are you sure you want to delete this recipe?</h3>
                <div className="dialog-buttons-container">
                    <button className="button-cancel" onClick={() => onDialog(false)}>Cancel</button>
                    <button className="button-delete" onClick={() => onDialog(true)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DialogDeleteRecipe;
