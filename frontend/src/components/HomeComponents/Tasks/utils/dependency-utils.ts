import { Task } from '@/components/utils/types';

export const getDependencyLabel = (
  depTask: Task | undefined,
  uuid: string
): string => {
  return depTask?.description || uuid.substring(0, 8);
};

export const filterAvailableDependencies = (
  tasks: Task[],
  editedDepends: string[],
  dependsSearchTerm: string,
  currentTaskUuid: string
): Task[] => {
  const term = dependsSearchTerm.toLowerCase();

  return tasks.filter(
    (t) =>
      t.uuid !== currentTaskUuid && // not itself
      t.status === 'pending' && // only pending tasks
      !editedDepends.includes(t.uuid) && // not already selected
      t.description.toLowerCase().includes(term) // matches search
  );
};
