import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";

const pages = [
  {title: 'Create', path: '/createPage'},
  {title: 'History', path: '/historyPage'}
];

export const HomePage = () => {
  const navigate = useNavigate();

	return (
    <div>
      <Container maxWidth={false} sx={{ userSelect: 'none', padding: '0 !important' }}>
        {/* header */}
				<AppBar position="static">
					<Container maxWidth={false} sx={{width: "90%", userSelect: 'none'}}>
						<Toolbar disableGutters>
              <Typography variant="h4"
                noWrap
                component="div"
                onClick={() => navigate("/")}
                sx={{ mr: 8, cursor: 'pointer', userSelect: 'none' }}
              >
											ATC
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', userSelect: 'none'}}>
                {pages.map(p => (
                  <Button
                    key={p.title}
                    onClick={() => navigate(p.path)}
                    size="large"
                    sx={{ color: 'white', display: 'block', userSelect: 'none', mr: 5 }}
                  >
                    {p.title}
                  </Button>
                ))}
              </Box>
						</Toolbar>
					</Container>
        </AppBar>
      </Container>
      <Outlet />
    </div>
	)
}