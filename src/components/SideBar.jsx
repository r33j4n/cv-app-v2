// src/components/Sidebar.jsx
import React from 'react';
import { List, ListItem, ListItemText, Drawer, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const items = [
    { text: 'View Profile', path: '/job-seeker-dashboard/view-profile' },
    { text: 'Edit Profile', path: '/job-seeker-dashboard/edit-profile' },
    { text: 'Upload CV', path: '/job-seeker-dashboard/upload-cv' },
    { text: 'Find Jobs', path: '/job-seeker-dashboard/find-jobs' },
    { text: 'Get Feedback', path: '/job-seeker-dashboard/get-feedback' },
    { text: 'Logout', path: '/job-seeker-dashboard/logout' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
      }}
    >
      <List>
        {items.map((item, index) => (
          <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
