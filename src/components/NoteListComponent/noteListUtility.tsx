// a little function to help us with reordering the result
export const reorder = (list:INote[], startIndex:number, endIndex:number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (source:INote[], destination:INote[], droppableSource:any, droppableDestination:any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    if(droppableSource.droppableId === "droppable"){
        return {"droppable":sourceClone,"droppable2":destClone};    
    }else{
        return {"droppable":destClone,"droppable2":sourceClone};    
    }
};

const grid = 8;

export const getItemStyle = (isDragging:boolean, draggableStyle:any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#ffd166' : '#06d6a0',
    display:'flex',
    // styles we need to apply on draggables
    ...draggableStyle
});

export const getDoneItemStyle = (isDragging:boolean, draggableStyle:any) => ({
    // some basic styles to make the items look a bit nicer
    textDecoration: 'line-through',
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#ffd166' : '#407080',
    color: '#ffffff',
    display:'flex',
    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = (isDraggingOver:boolean)=> ({
    background: isDraggingOver ? '#06d6a0' : '#efefef',
    padding: '2rem',
    width: '100%'
});
export const getDoneListStyle = (isDraggingOver:boolean)=> ({
    background: isDraggingOver ? 'lightblue' : '#efefef',
    padding: '2rem',
    width: '100%'
});


