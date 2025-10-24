import ChatIcon from "@mui/icons-material/Chat";
import {
  Datagrid,
  List,
  TextField,
  DateField,
  ReferenceField,
  FunctionField,
  ResourceProps,
  SearchInput,
  TextInput,
  SelectInput,
} from "react-admin";

const chatFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput source="room_id" label="Room ID" />,
  <TextInput source="sender" label="Sender" />,
  <SelectInput
    source="msgtype"
    label="Message Type"
    choices={[
      { id: "m.text", name: "Text" },
      { id: "m.image", name: "Image" },
      { id: "m.video", name: "Video" },
      { id: "m.audio", name: "Audio" },
      { id: "m.file", name: "File" },
    ]}
  />,
];

export const ChatHistoryList = () => (
  <List
    filters={chatFilters}
    sort={{ field: "timestamp", order: "DESC" }}
    exporter={false}
    perPage={50}
  >
    <Datagrid bulkActionButtons={false} rowClick={false}>
      <ReferenceField source="sender" reference="users" label="User" link="show">
        <TextField source="displayname" />
      </ReferenceField>
      <TextField source="sender" label="User ID" />
      <ReferenceField source="room_id" reference="rooms" label="Room" link="show">
        <TextField source="name" />
      </ReferenceField>
      <FunctionField
        label="Message"
        render={(record: any) => {
          if (record?.body) {
            const maxLen = 150;
            return record.body.length > maxLen 
              ? record.body.substring(0, maxLen) + "..." 
              : record.body;
          }
          if (record?.msgtype) {
            return `[${record.msgtype.replace("m.", "").toUpperCase()}]`;
          }
          return "-";
        }}
        sx={{ maxWidth: "400px" }}
      />
      <TextField source="msgtype" label="Type" />
      <DateField 
        source="timestamp" 
        label="Time" 
        showTime 
        options={{ 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }}
      />
    </Datagrid>
  </List>
);

const resource: ResourceProps = {
  name: "chat_history",
  icon: ChatIcon,
  list: ChatHistoryList,
  options: { label: "Chat History" },
};

export default resource;

