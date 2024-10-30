import e from 'express';
import { Exercise } from '../model/exercise';

const exercises = [
    new Exercise({ 
        id: 1, 
        name: 'Bench Press', 
        description: 'Lie back on a bench with your feet flat on the ground. Grasp the barbell with a grip slightly wider than shoulder-width. Lower the barbell to your chest, then press it back up until your arms are fully extended. This exercise primarily targets the chest, shoulders, and triceps.', 
        sets: 4, 
        reps: 8, 
        rest: 90, 
        muscleGroup: 'Chest' 
    }),
    new Exercise({ 
        id: 2, 
        name: 'Squat', 
        description: 'Stand with your feet shoulder-width apart and a barbell resting on your shoulders. Lower your body by bending at the knees and hips, keeping your back straight. Go as low as you can while maintaining form, then push through your heels to return to standing. Squats are excellent for building strength in the legs and glutes.', 
        sets: 3, 
        reps: 10, 
        rest: 60, 
        muscleGroup: 'Legs' 
    }),
    new Exercise({ 
        id: 3, 
        name: 'Deadlift', 
        description: 'Stand with your feet hip-width apart, and grip the barbell with both hands just outside your knees. Keep your back straight and lift the barbell by extending your hips and knees simultaneously. This compound movement effectively targets the entire posterior chain, including the back, glutes, and hamstrings.', 
        sets: 4, 
        reps: 6, 
        rest: 120, 
        muscleGroup: 'Back' 
    }),
    new Exercise({ 
        id: 4, 
        name: 'Pull-up', 
        description: 'Hang from a pull-up bar with your hands shoulder-width apart. Pull your body up until your chin is above the bar, then lower back down with control. Pull-ups are an effective bodyweight exercise for strengthening the upper back, biceps, and shoulders.', 
        sets: 3, 
        reps: 8, 
        rest: 90, 
        muscleGroup: 'Back' 
    }),
    new Exercise({ 
        id: 5, 
        name: 'Push-up', 
        description: 'Start in a plank position with your hands placed slightly wider than shoulder-width. Lower your body towards the ground while keeping your elbows close to your body, then push back up. Push-ups are great for building upper body strength and engaging the core.', 
        sets: 4, 
        reps: 12, 
        rest: 60, 
        muscleGroup: 'Chest' 
    }),
    new Exercise({ 
        id: 6, 
        name: 'Sit-up', 
        description: 'Lie on your back with your knees bent and feet flat on the ground. Place your hands behind your head and curl your upper body towards your knees, then lower back down. Sit-ups primarily target the abdominal muscles.', 
        sets: 3, 
        reps: 15, 
        rest: 45, 
        muscleGroup: 'Abs' 
    }),
    new Exercise({ 
        id: 7, 
        name: 'Plank', 
        description: 'Lie face down and raise your body off the ground, balancing on your forearms and toes. Keep your body in a straight line from head to heels. Hold this position to strengthen the core, shoulders, and glutes.', 
        sets: 4, 
        reps: 30, 
        rest: 60, 
        muscleGroup: 'Abs' 
    }),
    new Exercise({ 
        id: 8, 
        name: 'Lunge', 
        description: 'Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle. Return to the starting position and switch legs. Lunges help build leg strength and improve balance and coordination.', 
        sets: 3, 
        reps: 10, 
        rest: 60, 
        muscleGroup: 'Legs' 
    }),
    new Exercise({ 
        id: 9, 
        name: 'Shoulder Press', 
        description: 'Stand or sit with a barbell at shoulder height. Press the barbell overhead until your arms are fully extended, then lower it back to shoulder height. This exercise targets the shoulders and triceps.', 
        sets: 3, 
        reps: 8, 
        rest: 90, 
        muscleGroup: 'Shoulders' 
    }),
    new Exercise({ 
        id: 10, 
        name: 'Bicep Curl', 
        description: 'Stand with a dumbbell in each hand, arms at your sides. Curl the weights towards your shoulders while keeping your elbows close to your body. This exercise is great for building the biceps.', 
        sets: 4, 
        reps: 10, 
        rest: 60, 
        muscleGroup: 'Arms' 
    }),
    new Exercise({ 
        id: 11, 
        name: 'Tricep Dip', 
        description: 'Position yourself on a dip bar or the edge of a bench with your arms straight and feet on the ground. Lower your body by bending your elbows, then push back up. Tricep dips effectively target the triceps.', 
        sets: 3, 
        reps: 10, 
        rest: 90, 
        muscleGroup: 'Arms' 
    }),
    new Exercise({ 
        id: 12, 
        name: 'Tricep Pushdown', 
        description: 'Using a cable machine, grasp the handle with both hands and push it down towards your thighs while keeping your elbows stationary. This exercise isolates the triceps for effective muscle development.', 
        sets: 4, 
        reps: 12, 
        rest: 60, 
        muscleGroup: 'Arms' 
    }),
    new Exercise({ 
        id: 13, 
        name: 'Lat Pulldown', 
        description: 'Seated at a cable machine, grasp the bar with a wide grip. Pull the bar down towards your chest, squeezing your shoulder blades together, then slowly return to the starting position. This exercise targets the lats and upper back.', 
        sets: 3, 
        reps: 10, 
        rest: 75, 
        muscleGroup: 'Back' 
    }),
    new Exercise({ 
        id: 14, 
        name: 'Leg Press', 
        description: 'Sit on a leg press machine with your feet shoulder-width apart on the platform. Push the platform away from you by extending your legs, then return to the starting position. This exercise builds leg strength, targeting the quads, hamstrings, and glutes.', 
        sets: 4, 
        reps: 10, 
        rest: 90, 
        muscleGroup: 'Legs' 
    }),
    new Exercise({ 
        id: 15, 
        name: 'Seated Row', 
        description: 'Sit at a rowing machine, grasp the handles, and pull them towards you while keeping your back straight. Focus on squeezing your shoulder blades together. This exercise works the back and biceps.', 
        sets: 4, 
        reps: 10, 
        rest: 75, 
        muscleGroup: 'Back' 
    }),
    new Exercise({ 
        id: 16, 
        name: 'Leg Extension', 
        description: 'Sit on a leg extension machine and place your feet under the pad. Extend your legs until they are straight, then lower them back down. This exercise primarily targets the quadriceps.', 
        sets: 3, 
        reps: 12, 
        rest: 60, 
        muscleGroup: 'Legs' 
    }),
    new Exercise({ 
        id: 17, 
        name: 'Leg Curl', 
        description: 'Position yourself on a leg curl machine and place your legs under the pad. Curl your legs towards your glutes, then return to the starting position. This exercise focuses on strengthening the hamstrings.', 
        sets: 3, 
        reps: 10, 
        rest: 60, 
        muscleGroup: 'Legs' 
    }),
    new Exercise({ 
        id: 18, 
        name: 'Cable Fly', 
        description: 'Stand in the center of a cable machine with handles in each hand. With a slight bend in your elbows, bring the handles together in front of your chest, then slowly return to the starting position. This exercise effectively isolates the chest muscles.', 
        sets: 4, 
        reps: 12, 
        rest: 60, 
        muscleGroup: 'Chest' 
    }),
    new Exercise({ 
        id: 19, 
        name: 'Dumbbell Shoulder Press', 
        description: 'Sit or stand with a dumbbell in each hand at shoulder height. Press the weights overhead until your arms are fully extended, then lower them back to shoulder height. This exercise works the shoulders and triceps.', 
        sets: 4, 
        reps: 8, 
        rest: 90, 
        muscleGroup: 'Shoulders' 
    }),
    new Exercise({ 
        id: 20, 
        name: 'Hip Thrust', 
        description: 'Sit on the ground with your upper back against a bench and a barbell over your hips. Drive through your heels to lift your hips towards the ceiling, squeezing your glutes at the top. This exercise targets the glutes and hamstrings for powerful hip extension.', 
        sets: 4, 
        reps: 10, 
        rest: 90, 
        muscleGroup: 'Legs' 
    }),
];


const getAllExercises  = async (): Promise<Exercise[]> => {
    return exercises;
}
const getExerciseById = ({ id }: { id: number }): Exercise | null => {
    try {
        return exercises.find((exercise) => exercise.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllExercises, getExerciseById};