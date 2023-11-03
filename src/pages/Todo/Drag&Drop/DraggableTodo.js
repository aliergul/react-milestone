import { useDrag, useDrop } from "react-dnd";
import { TableRow, Tooltip } from "@mui/material";
import i18n from "../../../i18n/i18n";
import TableCell from "@mui/material/TableCell";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import updateArray from "immutability-helper";

const DraggableTodo = ({
  id,
  index,
  content,
  status,
  handleEditTask,
  deleteModal,
  handleMarkTodo,
  todoArray,
  setTodos,
}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = todoArray[dragIndex];
    todoArray = updateArray(todoArray, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRecord],
      ],
    });
    todoArray = todoArray.map((item, index) => {
      item.order = index;
      return item;
    });
    setTodos(todoArray);
  };

  const [{ isDragging }, drag, preview] = useDrag({
    type: "row",
    item: { type: "row", index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "row",
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const timestamp = (id) => {
    let time = id / 1000;
    return moment.unix(time).format("L HH:mm");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <TableRow
      key={id}
      ref={dropRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="hover:bg-main hover:bg-opacity-30"
    >
      <TableCell component="th" scope="row" ref={dragRef}>
        {showSkeleton ? (
          <Skeleton />
        ) : status === true ? (
          <span className="line-through">{content}</span>
        ) : (
          <span>{content}</span>
        )}
      </TableCell>
      <TableCell align="right">
        {showSkeleton ? (
          <Skeleton />
        ) : (
          <>
            <Tooltip title={i18n.t("tooltips:edit")}>
              <span
                className="cursor-pointer"
                onClick={() => handleEditTask(id)}
              >
                <EditNoteIcon className="mr-3" />
              </span>
            </Tooltip>
            <Tooltip title={i18n.t("tooltips:delete")}>
              <span className="cursor-pointer" onClick={() => deleteModal(id)}>
                <DeleteIcon className="mr-3" />
              </span>
            </Tooltip>
            <Tooltip title={i18n.t("tooltips:mark")}>
              <span
                className="cursor-pointer"
                onClick={() => handleMarkTodo(id)}
              >
                <PlaylistAddCheckIcon className="mr-3" />
              </span>
            </Tooltip>
            <span>{`${i18n.t("tooltips:schedule")} ${timestamp(id)}`}</span>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default DraggableTodo;
