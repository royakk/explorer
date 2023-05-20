import React, { useState } from "react";
import Folder from "./folder";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

const Explorer = () => {
  const [root, setRoot] = useState({
    name: "Root",
    files: [],
    folders: [],
  });
  const [selectedFolder, setSelectedFolder] = useState(root);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogInput, setDialogInput] = useState("");

  const handleAddFile = (folderName) => {
    setSelectedFolder(findFolder(root, folderName));
    setDialogType("file");
    setDialogOpen(true);
  };

  const handleAddFolder = (folderName) => {
    setSelectedFolder(findFolder(root, folderName));
    console.log("root folder",root.folders);
    setDialogType("folder");
    setDialogOpen(true);
  };

  const handleDeleteFile = (fileName) => {
    const updatedRoot = deleteFile(root, fileName);
    setRoot(updatedRoot);
  };
  
  const deleteFile = (folder, fileName) => {
    const updatedFiles = folder.files.filter((file) => file !== fileName);
    
    const updatedSubFolders = folder.folders.map((subFolder) => {
      const updatedFolder = deleteFile(subFolder, fileName);
      return updatedFolder;
    });
    console.log("update files",updatedFiles);
    return {
      ...folder,
      files: updatedFiles,
      folders: updatedSubFolders,
    };
  };

  const handleDeleteFolder = (folderName) => {
    const updatedRoot = deleteFolder(root, folderName);
    setRoot(updatedRoot);
  };
  
  const deleteFolder = (folder, folderName) => {
    const updatedFolders = folder.folders.filter((subFolder) => subFolder.name !== folderName);
    const updatedSubFolders = updatedFolders.map((subFolder) =>
      deleteFolder(subFolder, folderName)
    );
    return {
      ...folder,
      folders: updatedSubFolders,
    };
  };
  

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogInput("");
    setSelectedFolder(root);
  };

  const handleDialogConfirm = () => {
    const folderName = selectedFolder.name;
    const newInput = dialogInput.trim();
    if (dialogType === "file") {
      const folder = findFolder(root, folderName);
      if (folder && newInput && !folder.files.includes(newInput)) {
        folder.files.push(newInput);
        setRoot({ ...root });
      }
    } else if (dialogType === "folder") {
      const folder = findFolder(root, folderName);
      if (folder && newInput && !folderExists(folder, newInput)) {
        folder.folders.push({ name: newInput, files: [], folders: [] });
        setRoot({ ...root });
      }
    }
    handleDialogClose();
  };

  const findFolder = (folder, folderName) => {
    if (folder.name === folderName) {
      return folder;
    } else {
      for (const subFolder of folder.folders) {
        const result = findFolder(subFolder, folderName);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const folderExists = (folder, folderName) => {
    for (const subFolder of folder.folders) {
      if (subFolder.name === folderName) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <Folder
        name={root.name}
        files={root.files}
        folders={root.folders}
        onAddFile={handleAddFile}
        onAddFolder={handleAddFolder}
        onDeleteFile={handleDeleteFile}
        onDeleteFolder={handleDeleteFolder}
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === "file" ? "Add File" : "Add Folder"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label={dialogType === "file" ? "File Name" : "Folder Name"}
            value={dialogInput}
            onChange={(e) => setDialogInput(e.target.value)}
            fullWidth
          />
          <Button onClick={handleDialogConfirm}>Confirm</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Explorer;
