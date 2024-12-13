import { Avatar, Box, Popover, Tooltip } from "@mui/material";
import { MessageProps } from "../Chat";
import {
  Bubble,
  MessageActionButton,
  MessageContainer,
  MessageHour,
  MessageText,
} from "./Messages.style";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Input } from "../Chat/chat.styles";
import { format } from "date-fns";
import { useMemo, useState } from "react";

const MessageComponent = ({
  message,
  nickname,
  handleDelete,
  handleEdit,
}: {
  message: MessageProps;
  nickname: string;
  handleDelete: (id: string) => void;
  handleEdit: (msgData: MessageProps) => void;
}) => {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(message.content);
  const isLink = useMemo(() => {
    return message.content.match(
      /\b((https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)\b/
    );
  }, [message]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const myMessage = message.user == nickname;

  const handleSendEdit = () => {
    handleEdit({ ...message, content: inputValue });
    setEdit(false);
  };

  return (
    <MessageContainer myMessage={myMessage}>
      {!myMessage && (
        <Avatar sx={{ marginRight: 1 }}>
          {message.user ? (
            message.user.substring(0, 1).toUpperCase()
          ) : (
            <SmartToyIcon />
          )}
        </Avatar>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box sx={{ backgroundColor: "#484b52" }} padding={1}>
          <Tooltip title="Editar">
            <MessageActionButton onClick={() => setEdit(true)}>
              <ModeEditIcon />
            </MessageActionButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <MessageActionButton
              onClick={() => {
                handleDelete(message.id);
              }}
            >
              <DeleteIcon color="error" />
            </MessageActionButton>
          </Tooltip>
        </Box>
      </Popover>
      <Bubble
        isFirst={true}
        isLast={false}
        user={myMessage}
        showAvatar={true}
        onClick={myMessage && !edit && !isLink ? handleClick : () => {}}
      >
        {edit ? (
          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onBlur={handleSendEdit}
          />
        ) : isLink ? (
          <a
            style={{ color: myMessage ? "#fff" : "#000" }}
            target="_blank"
            href={message.content}
          >
            {message.content}
          </a>
        ) : (
          <MessageText>{message.content}</MessageText>
        )}

        <MessageHour>{format(new Date(message.date), "HH:mm")}</MessageHour>
      </Bubble>

      {myMessage && (
        <Avatar sx={{ marginLeft: 1 }}>
          {message.user.substring(0, 1).toUpperCase()}
        </Avatar>
      )}
    </MessageContainer>
  );
};

export default MessageComponent;
