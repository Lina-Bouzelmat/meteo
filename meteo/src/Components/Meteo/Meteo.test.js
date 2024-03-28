import { screen, render, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Meteo from './Meteo';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

function Wrapper(){
    return <Provider store={store}><Meteo/></Provider>
}

jest.mock('axios');

describe('Meteo component', () => {
    test('renders the component with weather data', async () => {
        axios.get.mockResolvedValue({
            data : {
                name : 'Paris',
                main : { temp : 25 },
                weather : [{ description : 'sunny' }],
                coord : { lon : 10, lat : 10 }
            }
        });
        await act(async () => {
            render(Wrapper());
        });
        await screen.findByText('Paris');
        expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    test('renders the component with error message when city is not found', async () => {
        axios.get.mockRejectedValue({ response: { status: 404 } });
        let alertMessage = '';
        jest.spyOn(window, 'alert').mockImplementation(message => {
            alertMessage = message;
        });
        await act(async () => {
            render(Wrapper());
        });
        await waitFor(() => {
            expect(alertMessage).toBe('Erreur : Ville non trouvée');
        });
        window.alert.mockRestore();
    });

    test('renders the component with error message when an error occurs', async () => {
        axios.get.mockRejectedValue({ message: 'Error Message' });
        let alertMessage = '';
        jest.spyOn(window, 'alert').mockImplementation(message => {
            alertMessage = message;
        });
        await act(async () => {
            render(Wrapper());
        });
        await waitFor(() => {
            expect(alertMessage).toBe('Une erreur s\'est produite: Error Message');
        });
        window.alert.mockRestore();
    });
});