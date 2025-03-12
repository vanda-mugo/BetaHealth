import { tokenCache } from '@/cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  )
}

/**
 * clerk provider wraps the entire application , providing authentication context and
 * state management via clerk
 * ClerkLoaded ensures that the clerk authentication state is loaded before rendering the application
 * <Slot /> acts as a placeholder for rendering the appropriate child route based on the current URL
 */