// src/components/Sidebar.jsx
import React from 'react';
import { List, ListItem, ListItemText, Drawer, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const items = [
    { text: 'View Jobs', path: '/job-provider-dashboard/view-jobs' },
    { text: 'Post Job', path: '/job-provider-dashboard/post-job' },
    { text: 'Edit Job', path: '/job-provider-dashboard/edit-job' },
    { text: 'Logout', path: '/job-provider-dashboard/logout' },
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
