import { CohereClientV2 } from 'cohere-ai';
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '.env') })
console.log(import.meta.url)

function cleanAiRes(input) {
    return input
        .replace(/^```html\n?/, '')     // Remove starting code block if present
        .replace(/^`+|`+$/g, '')        // Remove wrapping backticks
        .replace(/^"+|"+$/g, '')        // Remove wrapping double quotes
        .replace(/```$/, '')            // Remove ending code block
        .trim();
}

async function cohereCall(input) {
    try {
        const cohere = new CohereClientV2({
            token: `${process.env.COHERE_API}`,
        });
        const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [
                {
                    role: 'user',
                    content: `${input}

You are given structured sales data. Each entry includes:
1. "Month" – the month of the sale,
2. "Key" – the product name,
3. "Value" – the quantity sold.

Your tasks:
- Analyze product-wise total sales across all months.
- Based on trends and volume, determine whether each product is worth restocking.
- Prioritize profitability and sales volume in your recommendation.
- Finally, generate a month-wise table summarizing product sales.
- fontFamily: "'Product Sans', sans-serif" use this font family only

Be concise and clear.

Bind the response into a well structured HTML code for better format.
Remove the BoilerPlate HTML, Head and Body tags, start with a div tag.
Return ONLY the HIGHLY MODULARLY STYLED HTML code.
Use verdana type font style, and all black theme and rgb(65, 65, 65) for font.
RETURNED A TABLE.

thank you and know that I love you <3`,
                },
            ],
        });

        const raw = response.message.content[0].text;
        const cleaned = cleanAiRes(raw);
        return cleaned;

    } catch (error) {
        console.error('Cohere call failed:', error);
        return null;
    }
}

export default cohereCall;

export async function cohereCallChat(input) {
    const group = (JSON.parse(input)).grouped
    const query = (JSON.parse(input)).query

    try {
        const cohere = new CohereClientV2({
            token: `${process.env.COHERE_API}`,
        });
        const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [
                {
                    role: 'user',
                    content: `${JSON.stringify(group) + JSON.stringify(query)}
                    
                    You are a precise AI assistant. 
- Always answer in a clear, concise way. 
- Do not include any metadata, disclaimers, or extra commentary. 
- Only answer questions strictly based on the provided input array. 
- If the answer is not in the input array, respond with "Request Out of Scope."`,
                },
            ],
        });

        const answer = response.message.content[0].text;
        return answer;

    } catch (error) {
        console.error('Cohere call failed:', error);
        return null;
    }
}