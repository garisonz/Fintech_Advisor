import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createBankAccount } from "@/services/api"; // Ensure API functions are in a separate file

const CreateBankAccountButton: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [accountType, setAccountType] = useState("checking");
    const [userId, setUserId] = useState<string>("");

    const handleCreateAccount = async () => {
        setLoading(true);
        setMessage(null);

        try {
            const { data, error } = await createBankAccount(userId ? parseInt(userId) : null, accountType);
            
            if (error) throw new Error(error);

            setMessage(`Bank account created! Type: ${data.account_type}, No: ${data.account_number}`);
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <input
                type="number"
                placeholder="Enter User ID (optional)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border px-4 py-2"
            />

            <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="border px-4 py-2"
            >
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
                <option value="investment">Investment</option>
            </select>

            <Button 
                onClick={handleCreateAccount} 
                disabled={loading} 
                className="px-4 py-6 text-white rounded-lg"
            >
                {loading ? "Creating..." : "Create Bank Account"}
            </Button>

            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        </div>
    );
};

export default CreateBankAccountButton;
