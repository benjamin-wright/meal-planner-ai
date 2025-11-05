import { useParams } from 'react-router-dom';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-container">
      <h1>Recipe Detail</h1>
      <p>Viewing recipe {id}</p>
      <p>Recipe detail view coming soon...</p>
    </div>
  );
}
