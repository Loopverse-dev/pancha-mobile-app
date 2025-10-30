import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants';
import { authService } from '@/services/authService';
import { authDebug } from '@/utils/authDebug';

const AuthTestScreen = (): React.JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('Test User');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [authState, setAuthState] = useState<any>(null);

  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
    console.log(message);
  };

  const checkAuthState = () => {
    const state = authDebug.checkAuthState();
    setAuthState(state);
    addLog(`Auth State: ${state.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}`);
  };

  const handleTestSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    addLog(`Testing Sign Up: ${email}`);

    try {
      const user = await authService.signUp(email, password, {
        email,
        fullName,
        phoneNumber,
        userType: 'reader',
      });
      addLog(`✅ Sign Up Success: ${user.uid}`);
      Alert.alert('Success', `Account created for ${email}`);
      checkAuthState();
    } catch (error: any) {
      addLog(`❌ Sign Up Error: ${error.message}`);
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    addLog(`Testing Sign In: ${email}`);

    try {
      const user = await authService.signIn(email, password);
      const userData = await authService.getUserData(user.uid);
      addLog(`✅ Sign In Success: ${user.uid}`);
      addLog(`User Type: ${userData?.userType}`);
      Alert.alert('Success', `Signed in as ${email}`);
      checkAuthState();
    } catch (error: any) {
      addLog(`❌ Sign In Error: ${error.message}`);
      Alert.alert('Sign In Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSignOut = async () => {
    setLoading(true);
    addLog('Testing Sign Out');

    try {
      await authService.signOut();
      addLog('✅ Sign Out Success');
      Alert.alert('Success', 'Signed out successfully');
      checkAuthState();
    } catch (error: any) {
      addLog(`❌ Sign Out Error: ${error.message}`);
      Alert.alert('Sign Out Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTest = async () => {
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'Test123456';
    
    setEmail(testEmail);
    setPassword(testPassword);
    
    addLog('=== Running Quick Test ===');
    addLog(`Email: ${testEmail}`);
    addLog(`Password: ${testPassword}`);
    
    // Wait a bit for state to update
    setTimeout(async () => {
      setLoading(true);
      
      try {
        // Test Sign Up
        addLog('Step 1: Testing Sign Up...');
        const user = await authService.signUp(testEmail, testPassword, {
          email: testEmail,
          fullName: 'Quick Test User',
          phoneNumber: '+1234567890',
          userType: 'reader',
        });
        addLog(`✅ Sign Up Success: ${user.uid}`);
        
        // Test Sign Out
        addLog('Step 2: Testing Sign Out...');
        await authService.signOut();
        addLog('✅ Sign Out Success');
        
        // Test Sign In
        addLog('Step 3: Testing Sign In...');
        const signInUser = await authService.signIn(testEmail, testPassword);
        addLog(`✅ Sign In Success: ${signInUser.uid}`);
        
        addLog('=== All Tests Passed! ===');
        Alert.alert('Success', 'All authentication tests passed!');
        checkAuthState();
      } catch (error: any) {
        addLog(`❌ Test Failed: ${error.message}`);
        Alert.alert('Test Failed', error.message);
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('Logs cleared');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.splashButton }}>
            🔐 Auth Testing
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
            Debug and test authentication flows
          </Text>
        </View>

        {/* Auth State */}
        <View
          style={{
            backgroundColor: authState?.isAuthenticated ? '#d4edda' : '#f8d7da',
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
            Status: {authState?.isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
          </Text>
          {authState?.currentUser && (
            <Text style={{ fontSize: 12 }}>
              User: {authState.currentUser.email}
            </Text>
          )}
        </View>

        {/* Input Fields */}
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 12 }}>Test Credentials</Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 12,
            }}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Action Buttons */}
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 12 }}>Actions</Text>
          
          <TouchableOpacity
            onPress={handleQuickTest}
            disabled={loading}
            style={{
              backgroundColor: Colors.splashButton,
              padding: 14,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
              🚀 Run Quick Test (Sign Up → Sign Out → Sign In)
            </Text>
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <TouchableOpacity
              onPress={handleTestSignUp}
              disabled={loading}
              style={{
                flex: 1,
                backgroundColor: '#28a745',
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleTestSignIn}
              disabled={loading}
              style={{
                flex: 1,
                backgroundColor: '#007bff',
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              onPress={handleTestSignOut}
              disabled={loading}
              style={{
                flex: 1,
                backgroundColor: '#dc3545',
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
                Sign Out
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={checkAuthState}
              disabled={loading}
              style={{
                flex: 1,
                backgroundColor: '#6c757d',
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
                Check State
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Loading Indicator */}
        {loading && (
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <ActivityIndicator size="large" color={Colors.splashButton} />
            <Text style={{ marginTop: 8, color: '#666' }}>Processing...</Text>
          </View>
        )}

        {/* Logs */}
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontWeight: 'bold' }}>Console Logs</Text>
            <TouchableOpacity onPress={clearLogs}>
              <Text style={{ color: Colors.splashButton }}>Clear</Text>
            </TouchableOpacity>
          </View>
          
          <View
            style={{
              backgroundColor: '#1e1e1e',
              padding: 12,
              borderRadius: 4,
              maxHeight: 300,
            }}
          >
            {logs.length === 0 ? (
              <Text style={{ color: '#888', fontStyle: 'italic' }}>No logs yet...</Text>
            ) : (
              logs.map((log, index) => (
                <Text
                  key={index}
                  style={{
                    color: log.includes('✅') ? '#4ade80' : log.includes('❌') ? '#f87171' : '#e5e5e5',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    marginBottom: 4,
                  }}
                >
                  {log}
                </Text>
              ))
            )}
          </View>
        </View>

        {/* Navigation */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 32 }}>
          <TouchableOpacity
            onPress={() => router.push('/login')}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Text style={{ textAlign: 'center', fontWeight: '600' }}>Go to Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => router.push('/signup')}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Text style={{ textAlign: 'center', fontWeight: '600' }}>Go to Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthTestScreen;
