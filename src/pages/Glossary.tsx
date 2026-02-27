import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { GlossaryCard } from '@/components/GlossaryCard';
import { useUser } from '@/contexts/UserContext';
import { glossaryTerms } from '@/data/glossary';

const categories = ['All', 'API', 'n8n', 'AI', 'Data', 'Security'];

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { state } = useUser();

  const filtered = useMemo(() => {
    return glossaryTerms.filter(t => {
      const matchesSearch = t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || t.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const masteredCount = state.glossary.mastered.length;
  const totalCount = glossaryTerms.length;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-1">Glossary</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
            {masteredCount}/{totalCount} terms mastered ({Math.round((masteredCount / totalCount) * 100)}%)
          </p>

          {/* Search */}
          <div className="relative mb-3 sm:mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search terms..."
              className="w-full pl-10 pr-4 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          {/* Category filters - horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap mb-4 sm:mb-6 pb-1 sm:pb-0">
            {categories.map(c => (
              <motion.button
                key={c}
                onClick={() => setCategory(c)}
                whileTap={{ scale: 0.93 }}
                className={`px-3.5 py-2 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  category === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {c}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Terms */}
        <div className="space-y-2">
          {filtered.map((term, i) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
            >
              <GlossaryCard
                id={term.id}
                term={term.term}
                category={term.category}
                definition={term.definition}
                analogy={term.analogy}
                example={term.example}
                quiz={term.quiz}
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12 text-sm">No terms found.</p>
        )}
      </div>
    </AppLayout>
  );
}
