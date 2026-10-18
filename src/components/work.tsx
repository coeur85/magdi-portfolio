import Chapter from '@/components/chapter';
import { chapters } from '@/lib/portfolio';

export default function Work() {
  return (
    <div id="work">
      {chapters.map((chapter, i) => (
        <Chapter key={chapter.id} chapter={chapter} index={i} />
      ))}
    </div>
  );
}
