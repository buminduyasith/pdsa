// See https://aka.ms/new-console-template for more information
using graph;

Console.WriteLine("Hello, World!");


//int[,] graph = new int[,] { { 0, 4, 0, 0, 0, 0, 0, 8, 0 },
//                                      { 4, 0, 8, 0, 0, 0, 0, 11, 0 },
//                                      { 0, 8, 0, 7, 0, 4, 0, 0, 2 },
//                                      { 0, 0, 7, 0, 9, 14, 0, 0, 0 },
//                                      { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
//                                      { 0, 0, 4, 14, 10, 0, 2, 0, 0 },
//                                      { 0, 0, 0, 0, 0, 2, 0, 1, 6 },
//                                      { 8, 11, 0, 0, 0, 0, 1, 0, 7 },
//                                      { 0, 0, 2, 0, 0, 0, 6, 7, 0 } };
//DijkstraUsingMinHeap t = new DijkstraUsingMinHeap();
//t.dijkstra(graph, 0);

int vertices = 6;
Graph graph = new Graph(vertices);
int sourceVertex = 0;
graph.addEdge(0, 1, 4);
graph.addEdge(0, 2, 3);
graph.addEdge(1, 2, 1);
graph.addEdge(1, 3, 2);
graph.addEdge(2, 3, 4);
graph.addEdge(3, 4, 2);
graph.addEdge(4, 5, 6);
graph.dijkstra_GetMinDistances(sourceVertex);