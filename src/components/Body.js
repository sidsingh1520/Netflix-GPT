import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import MovieDetails from "./MovieDetails";

const Body = () => {
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/browse",
			element: <Browse />,
		},
		{
			path: "/error",
			element: <Error />,
		},
		{
			path: "/movie/:movieId",
			element: <MovieDetails />,
		},
	]);

	return (
		<div>
			<RouterProvider router={appRouter}></RouterProvider>
		</div>
	);
};

export default Body;
