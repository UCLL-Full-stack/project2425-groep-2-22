import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.exercise.deleteMany();
    await prisma.workout.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            username: 'user1',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'Admin',
            lastName: 'Admin',
            age: 30,
            weight: 75,
            height: 180,
            gender: 'Male',
            role: 'admin'
        }
    });

    const trainer = await prisma.user.create({
        data: {
            username: 'user2',
            password: await bcrypt.hash('trainer123', 12),
            firstName: 'Trainer',
            lastName: 'Trainer',
            age: 25,
            weight: 70,
            height: 175,
            gender: 'Female',
            role: 'trainer'
        }
    });

    const member = await prisma.user.create({
        data: {
            username: 'user3',
            password: await bcrypt.hash('member123', 12),
            firstName: 'Member',
            lastName: 'Member',
            age: 20,
            weight: 60,
            height: 190,
            gender: 'Female',
            role: 'member'
        }
    });

    const exercises = await prisma.exercise.createMany({
        data: [
            { name: 'Push-up', description: 'A basic push-up exercise.', sets: 3, reps: 12, rest: 60, muscleGroup: 'Chest' },
            { name: 'Squat', description: 'A basic squat exercise.', sets: 3, reps: 15, rest: 90, muscleGroup: 'Legs' },
            { name: 'Deadlift', description: 'A weight lifting exercise targeting the back and legs.', sets: 4, reps: 10, rest: 120, muscleGroup: 'Back' },
            { name: 'Pull-up', description: 'A bodyweight exercise for the back and biceps.', sets: 3, reps: 10, rest: 90, muscleGroup: 'Back' },
            { name: 'Bench Press', description: 'A weight lifting exercise for the chest and triceps.', sets: 4, reps: 8, rest: 120, muscleGroup: 'Chest' },
            { name: 'Bicep Curl', description: 'An exercise targeting the biceps.', sets: 3, reps: 12, rest: 60, muscleGroup: 'Arms' },
            { name: 'Tricep Dips', description: 'An exercise targeting the triceps.', sets: 3, reps: 12, rest: 60, muscleGroup: 'Arms' },
            { name: 'Lunges', description: 'A lower body exercise for legs and glutes.', sets: 3, reps: 12, rest: 90, muscleGroup: 'Legs' },
            { name: 'Plank', description: 'A core strengthening exercise.', sets: 3, reps: 60, rest: 30, muscleGroup: 'Core' },
            { name: 'Mountain Climbers', description: 'A full body exercise for endurance and cardio.', sets: 3, reps: 20, rest: 45, muscleGroup: 'Full Body' },
            { name: 'Leg Press', description: 'A weight machine exercise targeting legs.', sets: 4, reps: 10, rest: 120, muscleGroup: 'Legs' },
            { name: 'Lat Pulldown', description: 'A machine exercise for the back and shoulders.', sets: 3, reps: 12, rest: 90, muscleGroup: 'Back' },
            { name: 'Russian Twist', description: 'A core exercise for obliques.', sets: 3, reps: 20, rest: 45, muscleGroup: 'Core' },
            { name: 'Overhead Press', description: 'A weight lifting exercise for shoulders and arms.', sets: 4, reps: 10, rest: 120, muscleGroup: 'Shoulders' },
            { name: 'Dumbbell Row', description: 'An exercise for the back and shoulders.', sets: 3, reps: 12, rest: 90, muscleGroup: 'Back' },
            { name: 'Hip Thrust', description: 'A glute exercise that targets the hips and glutes.', sets: 3, reps: 15, rest: 90, muscleGroup: 'Glutes' }
        ]
    });

    const createdExercises = await prisma.exercise.findMany(); 


    const morningWorkout = await prisma.workout.create({
        data: {
            name: 'Morning Workout',
            intensity: 'Medium',
            type: 'Cardio',
            duration: 30,
            calories: 250,
            userId: admin.id,
            exercises: {
                connect: [
                    { id: createdExercises[0].id }, 
                    { id: createdExercises[1].id }, 
                    { id: createdExercises[5].id },
                    { id: createdExercises[8].id },
                ]
            }
        }
    });

    const fullBodyRoutine = await prisma.workout.create({
        data: {
            name: 'Full Body Routine',
            intensity: 'High',
            type: 'Strength',
            duration: 60,
            calories: 400,
            userId: admin.id
        }
    });

    const legDay = await prisma.workout.create({
        data: {
            name: 'Personal leg Day',
            intensity: 'High',
            type: 'Strength',
            duration: 60,
            calories: 400,
            userId: trainer.id,
            exercises: {
                connect: [
                    { id: createdExercises[4].id }, 
                    { id: createdExercises[5].id }  
                ]
            }
        }
    });

    const cardioBurn = await prisma.workout.create({
        data: {
            name: 'Cardio Burn',
            intensity: 'Medium',
            type: 'Cardio',
            duration: 45,
            calories: 300,
            userId: trainer.id,
            exercises: {
                connect: [
                    { id: createdExercises[6].id }, 
                    { id: createdExercises[7].id }  
                ]
            }
        }
    });

    const backAndBiceps = await prisma.workout.create({
        data: {
            name: 'Back and Biceps',
            intensity: 'High',
            type: 'Strength',
            duration: 60,
            calories: 500,
            userId: trainer.id,
            exercises: {
                connect: [
                    { id: createdExercises[8].id }, 
                    { id: createdExercises[9].id }  
                ]
            }
        }
    });

    const customFullBody = await prisma.workout.create({
        data: {
            name: 'Custom full Body Workout',
            intensity: 'Medium',
            type: 'Mixed',
            duration: 45,
            calories: 300,
            userId: member.id,
            exercises: {
                connect: [
                    { id: createdExercises[10].id }, 
                    { id: createdExercises[11].id },
                    { id: createdExercises[1].id },
                    { id: createdExercises[2].id },
                    { id: createdExercises[5].id }     
                ]
            }
        }
    });

    const legsAndCore = await prisma.workout.create({
        data: {
            name: 'Legs and Core personal',
            intensity: 'Medium',
            type: 'Strength',
            duration: 50,
            calories: 350,
            userId: member.id,
            exercises: {
                connect: [
                    { id: createdExercises[12].id }, 
                    { id: createdExercises[13].id }  
                ]
            }
        }
    });

    const cardioEndurance = await prisma.workout.create({
        data: {
            name: 'Cardio Endurance',
            intensity: 'Medium',
            type: 'Cardio',
            duration: 40,
            calories: 300,
            userId: member.id,
            exercises: {
                connect: [
                    { id: createdExercises[14].id } 
                ]
            }
        }
    });

    const flexibilityStretch = await prisma.workout.create({
        data: {
            name: 'Flexibility and Stretch',
            intensity: 'Low',
            type: 'Stretching',
            duration: 30,
            calories: 100,
            userId: member.id,
            exercises: {
                connect: [
                    { id: createdExercises[0].id } 
                ]
            }
        }
    });

    const posts = await prisma.post.createMany({
        data: [
            { title: 'Workout Tips for Beginners', description: 'Here are some great tips for beginners starting their fitness journey: always warm up, use proper form, and stay hydrated!', rating: 5, userId: trainer.id },
            { title: 'Leg Day Motivation', description: 'Leg day can be tough, but remember that every rep counts! Push yourself and see great results.', rating: 4, userId: member.id },
            { title: 'My Full Body Workout Routine', description: 'This is my full body workout that targets all major muscle groups. It includes compound exercises like squats, push-ups, and deadlifts.', rating: 5, userId: admin.id },
            { title: 'Help! Need Advice on Squat Form', description: 'I’ve been struggling with my squat form lately. Can anyone give me tips on how to improve my depth and knee alignment?', rating: 3, userId: member.id },
            { title: 'Shoulder Strength Tips', description: 'Struggling with shoulder exercises? Here are some tips to improve your overhead press and lateral raises for better shoulder development!', rating: 4, userId: trainer.id },
            { title: 'Post-Workout Nutrition', description: 'After a workout, it’s crucial to refuel with the right nutrients. Try a protein shake or a balanced meal to speed up recovery!', rating: 5, userId: admin.id },
            { title: 'Cardio Endurance Challenge', description: 'Try this cardio workout: 20 minutes of HIIT followed by a 10-minute steady-state run. See how far you can go and push your limits!', rating: 4, userId: trainer.id },
            { title: 'Dealing with Muscle Soreness', description: 'Muscle soreness is normal after a tough workout. Try foam rolling or a light walk to help with recovery.', rating: 3, userId: member.id },
            { title: 'Leg Press Form Help', description: 'I’ve been noticing discomfort in my knees during the leg press. Can anyone share tips to ensure I’m using the right form?', rating: 4, userId: member.id },
            { title: 'My Favorite Back and Biceps Workout', description: 'Here’s my go-to back and biceps workout for maximum growth. It includes lat pulldowns, dumbbell rows, and bicep curls. Give it a try!', rating: 5, userId: trainer.id }
        ]
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
