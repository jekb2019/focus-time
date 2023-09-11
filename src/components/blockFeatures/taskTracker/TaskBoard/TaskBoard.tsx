import styles from './TaskBoard.module.css';
import TaskTicket from '../TaskTicket/TaskTicket';
import { Task } from '../../../../service/taskTracker/type';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';

type TaskBoardProps = {
  tasks: Task[];
  reorderTasks: (id: string, newIndex: number) => void;
  refreshTasks: () => void;
  setIsCopmlete: (taskId: string, isCompleted: boolean) => void;
};

const TaskBoard = ({
  tasks,
  reorderTasks,
  refreshTasks,
  setIsCopmlete,
}: TaskBoardProps) => {
  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination } = result;
    if (destination) {
      reorderTasks(draggableId, destination.index);
      refreshTasks();
    }
  };

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={styles.draggable}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskTicket
                        key={task.id}
                        task={task}
                        setIsCopmlete={setIsCopmlete}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
