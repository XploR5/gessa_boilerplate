import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';
import Date from './Date';
import Text from './Text';
import NetPromoterScale from './NetPromoterScale';
import Rating from './Rating';
import FileUpload from './FileUpload';

const initialData = {
  availableQuestions: [
    { id: 'SingleChoice', content: 'Single Choice' },
    { id: 'MultipleChoice', content: 'Multiple Choice' },
    { id: 'Text', content: 'Text' },
    { id: 'Date', content: 'Date' },
    { id: 'FileUpload', content: 'File Upload' },
    { id: 'Rating', content: 'Rating' },
    { id: 'NetPromotorScale', content: 'Net Promotor Scale' },
  ],
  actualForm: [],
};

let count = 1;

const FormCreate = () => {
  const [data, setData] = useState<any>(initialData);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      const list: any = data[source.droppableId];
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);
      setData({ ...data, [source.droppableId]: list });
      console.log('itself');
    } else if (
      source.droppableId === 'actualForm' &&
      destination.droppableId === 'availableQuestions'
    ) {
      const sourceList = data[source.droppableId];
      const destList = data[destination.droppableId];
      sourceList.splice(source.index, 1);
      setData({
        ...data,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      });
      console.log('actual to available');
    } else if (
      source.droppableId === 'availableQuestions' &&
      destination.droppableId === 'actualForm'
    ) {
      const sourceList = data[source.droppableId];
      const destList = data[destination.droppableId];
      const [removed] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, removed);

      console.log(count);

      switch (removed.content) {
        case 'Single Choice':
          sourceList.unshift({
            id: 'SingleChoice' + count++,
            content: 'Single Choice',
          });
          break;
        case 'Multiple Choice':
          sourceList.unshift({
            id: 'MultipleChoice' + count++,
            content: 'Multiple Choice',
          });
          break;
        case 'Text':
          sourceList.unshift({ id: 'Text' + count++, content: 'Text' });
          break;
        case 'Date':
          sourceList.unshift({ id: 'Date' + count++, content: 'Date' });
          break;
        case 'FileUpload':
          sourceList.unshift({
            id: 'FileUpload' + count++,
            content: 'File Upload',
          });
          break;
        case 'Rating':
          sourceList.unshift({
            id: 'Rating' + count++,
            content: 'Rating',
          });
          break;
        case 'NetPromotorScale':
          sourceList.unshift({
            id: 'NetPromotorScale' + count++,
            content: 'Net Promotor Scale',
          });
          break;
        default:
          break;
      }
      setData({
        ...data,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex' }}>
          <Droppable droppableId="availableQuestions">
            {(provided: any, snapshot: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? '#e6e6e6' : '#f2f2f2',
                  padding: 4,
                  width: 250,
                  minHeight: 500,
                  marginRight: 20,
                }}
              >
                <h4>List of Available Question Types</h4>
                {data.availableQuestions.map((item: any, index: any) => (
                  <Draggable
                    key={item.id + '1'}
                    draggableId={item.id + '1'}
                    index={index}
                  >
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 16,
                          margin: '0 0 8px 0',
                          minHeight: '25px',
                          backgroundColor: snapshot.isDragging
                            ? '#263B4A'
                            : '#456C86',
                          color: 'white',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="actualForm">
            {(provided: any, snapshot: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? '#e6e6e6' : '#f2f2f2',
                  padding: 4,
                  width: 550,
                  minHeight: 500,
                }}
              >
                <h4>Actual Form</h4>
                {data.actualForm.map((item: any, index: any) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 16,
                          margin: '0 0 8px 0',
                          width: '100%',
                          backgroundColor: snapshot.isDragging
                            ? '#f1ffff'
                            : '#fff',
                          color: 'black',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                        {item.content === 'Single Choice' && <SingleChoice />}
                        {item.content === 'Date' && <Date />}
                        {item.content === 'Text' && <Text />}
                        {item.content === 'File Upload' && <FileUpload />}
                        {item.content === 'Rating' && <Rating maxRating={5} />}
                        {item.content === 'Net Promotor Scale' && <NetPromoterScale />}
                        {item.content === 'Multiple Choice' && (
                          <MultipleChoice />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default FormCreate;
