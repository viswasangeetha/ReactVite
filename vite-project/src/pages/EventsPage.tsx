import { Link, useLoaderData } from "react-router-dom";

interface Article {
    name: string;
    title: string;
    content: string[];
}

function EventsPage() {
    const { articles } = useLoaderData() as { articles: Article[] };
  return (
    <>
        <h1> Article Contents </h1>

        <div>
        {   
        articles.map(a => (
            <Link to={`/articles/${a.name}`} key={a.name}>
            <div key={a.name}>
                <h2>{a.title}</h2>
                <p>{a.content[0].substring(0, 150)}</p>
            </div>
            </Link>))
        }   
        </div>
    </>
  );
}
export default EventsPage;