import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import Layout from './Layout'
import EventsPage from './pages/EventsPage'
import axios from 'axios'

const router = createBrowserRouter([{
  path: '/', 
  element: <Layout />,
  errorElement: <h1>Page not found</h1>,
  children: [
    {
      path: '/', 
      element: <HomePage />
    },
    {path: '/about', element: <AboutPage />},
    {path: '/contact', element: <ContactPage />},
    {
      path: '/events', element: <EventsPage />, 
      loader: async () => {
        const response = await axios('/api/articles');
        const {articles} = response.data;
        return {articles};
      }
    },
    { 
      path: '/events/:eventId', 
      element: <EventsPage />,
      loader: async function() {
        const response = await axios('/api/articles/learn-react');
        const {upvotes, comments} = response.data;
        return {upvotes, comments};
      }
    }
  ],
}]);

function App() {

  return (
      <>
        <RouterProvider router={router} />
      </>
    )
}

export default App
