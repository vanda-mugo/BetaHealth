import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/components/AuthContext';

const Index = () => {
    const router = useRouter();
    const { user, authChecked } = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!authChecked || !isMounted) {
            // If auth check is not complete or component is not mounted, do nothing
            // Authentication check still in progress - optional loading logic can go here
            console.log('Checking authentication state...');
            return;
        }

        if (user) {
            router.push('/(tabs)'); // Redirect to home if logged in
        } else {
            router.push('/signIn'); // Redirect to login if not logged in
        }
    }, [user, authChecked, isMounted]); // Run effect on user or authChecked changes

    // Return empty fragment for a redirect-only page
    return <></>;
};

export default Index;
