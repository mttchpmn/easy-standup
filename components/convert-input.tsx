// TODO - Make polymorphic to reduce coupling
class InputConverter {
    private _greeting: string = "🌅 Morning team!!!";
    private _focus: string = "🎯 Current Focus:";
    private _meeting: string = "🗓️ Meetings:";
    private _blocker: string = "❗ Blockers:";
    private _complete: string = "✔️ Tasks completed";
    private _inProgress: string = "💻 Tasks In Progress:";
    private _todo: string = "📋 Tasks To Do:";
    private _questions: string = "❓ Questions:";

    private _focusLines: string[] = [];
    private _meetingLines: string[] = [];
    private _blockerLines: string[] = [];
    private _taskLinesComplete: string[] = [];
    private _taskLinesInProgress: string[] = [];
    private _taskLinesTodo: string[] = [];
    private _questionLines: string[] = [];

    constructor() {
    }

    public convertText(input: string): string {
        const lines = this.splitText(input);
        this.parseLines(lines);

        return this.generateTextOutput();
    }

    public convertHtml(input: string) {
        const lines = this.splitText(input);
        this.parseLines(lines);

        return this.generateHtmlOutput();
    }

    private splitText(rawText: string): string[] {
        return rawText.split("\n");
    }

    private joinLines(lines: string[]): string {
        return lines.join("\n");
    }

    private parseLines(lines: string[]): void {
        return lines.map(line => this.parseLineEstimate(line))
            .forEach(line => this.parseLine(line))
    }

    private parseLine(line: string) {
        var token = line[0];

        switch (token) {
            case "*":
                this._focusLines.push(this.stripBullet(line));
                break;
            case "o":
                this._meetingLines.push(this.stripBullet(line));
                break;
            case "!":
                this._blockerLines.push(this.stripBullet(line));
                break;
            case "<":
                this._taskLinesComplete.push(this.stripBullet(line));
                break;
            case "-":
                this._taskLinesInProgress.push(this.stripBullet(line));
                break;
            case ">":
                this._taskLinesTodo.push(this.stripBullet(line));
                break;
            case "?":
                this._questionLines.push(this.stripBullet(line));
                break;
            default:
                console.error(`ERROR: Token '${token}' not supported`);
        }
    }

    private stripBullet(line: string): string {
        return line.substr(1).trim();
    }

    private parseLineEstimate(line: string): string {
        const estimateRegex = /\^(\d+|1\.\d)d/;

        const match = line.match(estimateRegex);
        if (!match) return line;
        const number = match[0].replace(/[\^d]/g, "")

        return line.replace(match[0], "") + `(⌚ ${number} days)`
    }

    private parseLineTicketNumber(line: string): string {
        const ticketNumberRegex = /#\d{4}/;

        const match = line.match(ticketNumberRegex);

        if (!match) return line;

        return "";
    }

    private generateTextOutput(): string {
        const greeting = this._greeting + "\n";

        const focusText = this._focus + "\n";
        const focusBlock = this.getTextBlock(focusText, this._focusLines);

        const meetingText = this._meeting + "\n"
        const meetingBlock = this.getTextBlock(meetingText, this._meetingLines);

        const taskText = this._todo + "\n"
        const taskBlock = this.getTextBlock(taskText, this._taskLinesInProgress);

        const todoText = this._todo + "\n"
        const todoBlock = this.getTextBlock(todoText, this._taskLinesTodo);

        return greeting + focusBlock + meetingBlock + todoBlock;
    }

    public generateHtmlOutput() {
        if (!this.hasContent()) return null;

        return (
            <div>
                <p><strong>{this._greeting}</strong></p><br/>
                {this.getHtmlBlock(this._focus, this._focusLines)}
                {this.getHtmlBlock(this._meeting, this._meetingLines)}
                {this.getHtmlBlock(this._blocker, this._blockerLines)}
                {this.getHtmlBlock(this._complete, this._taskLinesComplete)}
                {this.getHtmlBlock(this._inProgress, this._taskLinesInProgress)}
                {this.getHtmlBlock(this._todo, this._taskLinesTodo)}
                {this.getHtmlBlock(this._questions, this._questionLines)}
            </div>
        );
    }

    private getHtmlBlock(headline: string, lines: string[]) {
        if (lines.length < 1) return null;

        return (
            <div>
                <p><strong>{headline}</strong></p>
                <ul>
                    {lines.map(l => <li key={l}>{l}</li>)}
                </ul>
                <br/>
            </div>
        )
    }

    private hasContent(): boolean {
        const allLines = [
            this._focusLines,
            this._meetingLines,
            this._blockerLines,
            this._taskLinesInProgress,
            this._taskLinesTodo
        ]

        return allLines.some(arr => arr.length > 0);
    }

    private getTextBlock(headline: string, lines: string[]): string {
        const bullets = lines.map(line => "- " + line)
        return headline + this.joinLines(bullets) + "\n";
    }
}

export {InputConverter};