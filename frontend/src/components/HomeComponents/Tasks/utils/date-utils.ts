import { Task } from '@/components/utils/types';

export const isOverdue = (due?: string) => {
  if (!due) return false;

  const parsed = new Date(
    due.replace(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/,
      '$1-$2-$3T$4:$5:$6Z'
    )
  );

  const dueDate = new Date(parsed);
  dueDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return dueDate < today;
};

export const sortWithOverdueOnTop = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    const aOverdue = a.status === 'pending' && isOverdue(a.due);
    const bOverdue = b.status === 'pending' && isOverdue(b.due);

    // Overdue always on top
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // Otherwise fall back to ID sort and status sort
    return 0;
  });
};
