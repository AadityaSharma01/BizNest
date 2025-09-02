import { useEffect, useState, useRef } from "react";
import DataForChart from "./ChartCard";
import { Navbar } from "./navbar";
import "../../styles/global.css"
import styles from "../../styles/chatArea.module.css"
import API from "../../src/axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartComponent = () => {
    const [aiRes, setAiRes] = useState("");
    const [chartData, setChartData] = useState(null);
    const [chartKey, setChartKey] = useState(0);
    const canvasRef = useRef(null);
    const [query, setQuery] = useState("");
    const [reply, setReply] = useState("");

    const talkToChat = async(query) => {
        const { grouped } = await DataForChart();
        //console.log("from chart component:= ", grouped, "\n\n", query)
        const replyFromChat = (await API.post("/api/aires/chat",{
            grouped: grouped,
            query: query
        })).data.resultChat
        console.log(replyFromChat);
        setReply(reply + query.toUpperCase() +  "\n\n" + replyFromChat + "\n\n")
        setQuery("")
    }

    useEffect(() => {
        const fillData = async () => {
            try {
                const data = await DataForChart();
                if (!data || !canvasRef.current) return;

                setChartData({
                    labels: data.labels,
                    datasets: data.datasets,
                });

                setAiRes(data.aiResAPI?.trim?.() || "");

                setChartKey(prev => prev + 1);
            } catch (error) {
                console.error("Failed to load chart data:", error);
            }
        };

        fillData();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ width: "100%", height: "300px", backgroundColor: "#1d1d1dff" }}>
                <canvas ref={canvasRef} style={{ display: "none" }} />
                {chartData ? (
                    <Bar data={chartData} key={chartKey}/>
                ) : (
                    <div className={styles.loading}>Loading chart...</div>
                )}
            </div>

            {aiRes && (
                <div style={{ fontFamily: "'Product Sans', sans-serif" }} className={styles.chatdiv}>
                    <div dangerouslySetInnerHTML={{ __html: aiRes }} style={{ width: "100vw" }} />
                    <h1 className={styles.talk}>your assistant is here</h1>

                    <div style={{ minWidth: "250px" }}>
                        <textarea readOnly value={reply} name="" id="" className={styles.replyarea}></textarea>
                        <textarea
                            style={{ fontFamily: "'Product Sans', sans-serif" }}
                            className={styles.textarea}
                            placeholder="...ask anything to your AI assistant"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}/>
                        <button className={styles.sendButton} onClick={()=>talkToChat(query)}></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChartComponent;
