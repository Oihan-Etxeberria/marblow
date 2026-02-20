import { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function BettingForm({ event }) {
    const [amount, setAmount] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            event_id: event.id,
            amount,
            selectedOption,
        });
        alert(`Bet placed: ${amount} on ${selectedOption}`);
    };

    return (
        <div
            className="card"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderLeft: '4px solid #3b82f6',
            }}
        >
            <div className="card-body">
                <h5 className="card-title mb-4">Place Your Bet</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Betting Option</Form.Label>
                        <Form.Select
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            required
                        >
                            <option value="">-- Select an option --</option>
                            <option value="team-a">Team A Wins</option>
                            <option value="team-b">Team B Wins</option>
                            <option value="draw">Draw</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bet Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            step="0.01"
                            required
                        />
                        <Form.Text className="text-muted">
                            Minimum bet: $1.00
                        </Form.Text>
                    </Form.Group>

                    <div
                        className="mb-3 p-3"
                        style={{
                            backgroundColor: '#f0f9ff',
                            borderRadius: '5px',
                        }}
                    >
                        <strong>Bet Summary:</strong>
                        <div className="mt-2">
                            <div>Event: {event.name}</div>
                            <div>
                                Option: {selectedOption || 'Not selected'}
                            </div>
                            <div>Amount: ${amount || '0.00'}</div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        style={{ backgroundColor: '#3b82f6' }}
                    >
                        Confirm Bet
                    </button>
                </Form>
            </div>
        </div>
    );
}
