const API_URL = 'http://localhost:3000/api/v1/auth';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function register(name: string, email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    console.log(response);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar la cuenta');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}
