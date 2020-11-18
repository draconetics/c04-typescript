import { start } from 'repl';
import {getDoneItemStyle, getDoneListStyle, getItemStyle, getListStyle, move, reorder} from '../../../components/NoteListComponent/noteListUtility'

describe('#utility - NoteListComponent', () => {
    it('should reorder an array from their indexes', () => {
        let sample = [
            {_id:"123343455667abcd01",text:"this is a task01", complete:false},
            {_id:"123343455667abcd02",text:"this is a task02", complete:false},
            {_id:"123343455667abcd03",text:"this is a task03", complete:false}
        ];
        let startIndex = 2;
        let endIndex = 0;
        let sampleOrdered = reorder(sample, startIndex, endIndex);
        let resp = [
            {_id:"123343455667abcd03",text:"this is a task03", complete:false},
            {_id:"123343455667abcd01",text:"this is a task01", complete:false},
            {_id:"123343455667abcd02",text:"this is a task02", complete:false},
        ];

        expect(sampleOrdered).toEqual(resp);
    });

    it('should move a task from notesDo to notesDone',()=>{
        let listA = [
            {_id:"123343455667abcd01",text:"this is a task01", complete:false},
            {_id:"123343455667abcd02",text:"this is a task02", complete:false},
            {_id:"123343455667abcd03",text:"this is a task03", complete:false}
        ];

        let listB = [
            {_id:"123343455667abcdB01",text:"this is a taskB01", complete:true},
            {_id:"123343455667abcdB02",text:"this is a taskB02", complete:true},
            {_id:"123343455667abcdB03",text:"this is a taskB03", complete:true}
        ];

        let droppableA = {index:0,droppableId:"droppable"};
        let droppableB = {index:0,droppableId:"droppable2"};

        let resp = move(listA,listB,droppableA,droppableB);
        let respListA = [
            {_id:"123343455667abcd02",text:"this is a task02", complete:false},
            {_id:"123343455667abcd03",text:"this is a task03", complete:false}
        ];
        let respListB = [
            {_id:"123343455667abcd01",text:"this is a task01", complete:true},
            {_id:"123343455667abcdB01",text:"this is a taskB01", complete:true},
            {_id:"123343455667abcdB02",text:"this is a taskB02", complete:true},
            {_id:"123343455667abcdB03",text:"this is a taskB03", complete:true}
        ];
        expect(resp).toEqual({droppable:respListA,droppable2:respListB})
    })

    it('should move a task from notesDone to notesDo',()=>{
        let listA = [
            {_id:"123343455667abcd01",text:"this is a task01", complete:false},
            {_id:"123343455667abcd02",text:"this is a task02", complete:false},
            {_id:"123343455667abcd03",text:"this is a task03", complete:false}
        ];

        let listB = [
            {_id:"123343455667abcdB01",text:"this is a taskB01", complete:true},
            {_id:"123343455667abcdB02",text:"this is a taskB02", complete:true},
            {_id:"123343455667abcdB03",text:"this is a taskB03", complete:true}
        ];

        let droppableA = {index:1,droppableId:"droppable"};
        let droppableB = {index:0,droppableId:"droppable2"};

        let resp = move(listB,listA,droppableB,droppableA);
        let respListA = [
            {_id:"123343455667abcd01",text:"this is a task01", complete:false},
            {_id:"123343455667abcdB01",text:"this is a taskB01", complete:false},
            {_id:"123343455667abcd02",text:"this is a task02", complete:false},
            {_id:"123343455667abcd03",text:"this is a task03", complete:false},
        ];
        let respListB = [
            {_id:"123343455667abcdB02",text:"this is a taskB02", complete:true},
            {_id:"123343455667abcdB03",text:"this is a taskB03", complete:true}
        ];
        expect(resp).toEqual({droppable:respListA,droppable2:respListB})
    })

    it('should change background-color of do-item when it is dragging',()=>{
        let style = getItemStyle(true, {});
        expect(style.background).toBe("#ffd166")
        style = getItemStyle(false, {});
        expect(style.background).toBe("#06d6a0")
    })

    it('should change background-color of done-item when it is dragging',()=>{
        let style = getDoneItemStyle(true, {});
        expect(style.background).toBe("#ffd166")
        style = getDoneItemStyle(false, {});
        expect(style.background).toBe("#407080")
    })

    it('should change background-color of do-list when it is dragging',()=>{
        let style = getListStyle(true);
        expect(style.background).toBe("#06d6a0")
        style = getListStyle(false);
        expect(style.background).toBe("#efefef")
    }) 

    it('should change background-color of done-list when it is dragging',()=>{
        let style = getDoneListStyle(true);
        expect(style.background).toBe("lightblue")
        style = getDoneListStyle(false);
        expect(style.background).toBe("#efefef")
    }) 
});