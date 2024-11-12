import { diagramSchema, type Diagram } from './domain/diagram';
import { cloneDiagram, generateDiagramId, generateId } from './utils';

export const runningIdGenerator = (): (() => string) => {
    let id = 0;
    return () => (id++).toString();
};

const cloneDiagramWithRunningIds = (diagram: Diagram) =>
    cloneDiagram(diagram, runningIdGenerator());

const cloneDiagramWithIds = (diagram: Diagram): Diagram => ({
    ...cloneDiagram(diagram, generateId),
    id: generateDiagramId(),
});

export const diagramToJSONOutput = (diagram: Diagram): string => {
    const clonedDiagram = cloneDiagramWithRunningIds(diagram);
    return JSON.stringify(clonedDiagram, null, 2);
};

export const diagramFromJSONInput = (json: string): Diagram => {
    const loadedDiagram = JSON.parse(json);

    const diagram = diagramSchema.parse({
        ...loadedDiagram,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return cloneDiagramWithIds(diagram);
};