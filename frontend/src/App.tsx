import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { LatestInConstruction } from './components/pages/LatestInConstruction';
import { InsightsPage } from './components/pages/InsightsPage';
import { ContactPage } from './components/pages/ContactPage';
import { ArticlePage } from './components/pages/ArticlePage';
import { Layout } from './components/templates/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/latest-in-construction" element={<LatestInConstruction />} />
          <Route path="/latest-in-construction/article/:articleId" element={<ArticlePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
