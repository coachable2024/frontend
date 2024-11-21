import { useState } from 'react';
import { goalService } from '../../services/goalService';
import { CreateGoalDTO, Goal } from '../../types/goalsType';
import { Button } from '../ui/button';


interface CreateGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateGoalModal({ isOpen, onClose }: CreateGoalModalProps) {
    const [formData, setFormData] = useState<Partial<CreateGoalDTO>>({
      status: 'not-started',
      priority: 'medium',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await goalService.createGoal(formData as CreateGoalDTO);
            onClose();
            // Optionally refresh goals list or show success message
          } catch (error) {
            // Handle error
            console.error('Failed to create goal:', error);
          }
    };

    return (
        <div className="modal"> {/* Add your modal styling */}
          <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Goal Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
        />
        <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
        />
        <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="default">Create Goal</Button>
            </div>
        </form>
        </div>
    );
}