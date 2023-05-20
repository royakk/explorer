import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { ButtonBase, Box, Stack } from "@mui/material";

const Folder = ({
  name,
  files,
  folders,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const File = ({ name, folderName, onDelete }) => {
    return (
      <>
      <Stack direction='row' spacing={1}>
        <Box
          sx={{
            mb: 1,
            width: "100px",
            padding: 1,
            border: "1px solid gray",
            borderRadius: "5px",
            boxShadow: "1px 2px 3px gray",
          }}
        >
          <span style={{ margin: "5px" }}>📄</span>
          <span>{name}</span>
        </Box>
        <ButtonBase onClick={() => onDelete(name)}>
          <DeleteIcon />
        </ButtonBase>
        </Stack>
        </>
    );
  };

  return (
    <div>
      <Box display="flex" alignItems="center" mb={2}>
        <span onClick={handleToggleOpen}>
          {isOpen ? <KeyboardArrowDownIcon /> : <ArrowRightIcon />}
        </span>
        <span>{name}</span>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <ButtonBase onClick={() => onAddFile(name)}>
            <NoteAddIcon />
          </ButtonBase>
          <ButtonBase onClick={() => onAddFolder(name)}>
            <CreateNewFolderIcon />
          </ButtonBase>
          {name ==='Root' ? null :  <ButtonBase onClick={() => onDeleteFolder(name)}>
            <DeleteIcon />
          </ButtonBase>}
          
        </Stack>
      </Box>
      {isOpen && (
        <div style={{ marginLeft: "50px",marginBottom:"20px" }}>
          {files.map((file) => (
            <File
              key={file}
              name={file}
              folderName={folders}
              onDelete={onDeleteFile}
            />
          ))}
          {folders.map((folder) => (
            <Folder
              key={folder.name}
              name={folder.name}
              files={folder.files}
              folders={folder.folders}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              onDeleteFile={onDeleteFile}
              onDeleteFolder={onDeleteFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
