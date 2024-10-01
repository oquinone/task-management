import { Draggable } from "react-beautiful-dnd";
import CardAntd from "../antd components/cardAntd";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Suspense, lazy } from "react";
import { useTaskHooks } from "./task.hooks";
import { priorityList } from "../../config/types";
import SpaceAntd from "../antd components/spaceAntd";
import dayjs from "dayjs";

const Modal = lazy(() => import("../antd components/modalAntd"));
const Input = lazy(() => import("../antd components/inputAntd"));
const Textarea = lazy(() => import("../antd components/textareaAntd"));
const Select = lazy(() => import("../antd components/selectAntd"));
const DatePicker = lazy(() => import("../antd components/datePickerAntd"));

const TaskComponent = (props: any) => {
  const { task, index } = props || null;
  const {
    taskModal,
    setTaskModal,
    openTaskModal,
    taskData,
    setTaskData,
    updateTask,
  } = useTaskHooks();
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className=" min-h-[80px] mb-[5px]"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardAntd
              style={{ minWidth: 100 }}
              className="rounded"
              onDoubleClick={() => openTaskModal(task)}
            >
              <div>
                <p className="font-bold">
                  {task.content.length > 15
                    ? task.content.slice(0, 15)
                    : task.content}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <span>
                  <p>{new Date(task.date).toLocaleDateString()}</p>
                </span>
                <span>
                  {task.priority === "Highest" && (
                    <KeyboardDoubleArrowUpOutlinedIcon color="error" />
                  )}
                  {task.priority === "High" && (
                    <KeyboardArrowUpOutlinedIcon color="error" />
                  )}
                  {task.priority === "Low" && (
                    <KeyboardArrowDownOutlinedIcon color="primary" />
                  )}
                  {task.priority === "Lowest" && (
                    <KeyboardDoubleArrowDownOutlinedIcon color="primary" />
                  )}
                </span>
              </div>
            </CardAntd>
          </div>
        )}
      </Draggable>

      <Suspense>
        <Modal
          open={taskModal}
          title="Task"
          okText="Update"
          onOk={() => updateTask(task.id)}
          onCancel={() => setTaskModal(false)}
        >
          <label>Summary</label>
          <Input
            className="mb-[10px]"
            placeholder="Ex. Add APIs"
            value={taskData.summary}
            onChange={(e: any) =>
              setTaskData({ ...taskData, summary: e.target.value })
            }
          />

          <label>Description</label>
          <Textarea
            className="mb-[10px]"
            placeholder="Ex. Connect backend API to display user list"
            value={taskData.description}
            onChange={(e: any) =>
              setTaskData({
                ...taskData,
                description: e.target.value,
              })
            }
            autoSize={{ minRows: 6, maxRows: 6 }}
          />

          <div className="flex flex-row justify-between">
            <div className="flex flex-col w-[48%]">
              <label>Priority</label>
              <Select
                className="mb-[10px]"
                placeholder="Ex. Add new styling"
                value={taskData.priority}
                onChange={(e: any) =>
                  setTaskData({
                    ...taskData,
                    priority: e,
                  })
                }
                options={priorityList}
                style={{ width: "200px" }}
                optionRender={(option: any) => (
                  <SpaceAntd>
                    <span role="img" aria-label={option.data.label}>
                      <option.data.icon color={option.data.color} />
                    </span>
                    {option.data.label}
                  </SpaceAntd>
                )}
                allowClear
              />
            </div>

            <div className="flex flex-col w-[48%]">
              <label>Due Date</label>
              <DatePicker
                placeholder="Select Date"
                value={dayjs(taskData.date)}
                onChange={(e: any) =>
                  setTaskData({
                    ...taskData,
                    date: e,
                  })
                }
              />
            </div>
          </div>
        </Modal>
      </Suspense>
    </>
  );
};

export default TaskComponent;
