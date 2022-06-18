using Priority_Queue;
using System;
using System.Collections.Generic;
using System.Linq;


public class Program
{
    public class Edge
    {
        public Edge(Vertex source, Vertex destination, int weight)
        {
            Source = source;
            Destination = destination;
            Weight = weight;
        }

        public int Weight { get; set; }
        public Vertex Source { get; set; }
        public Vertex Destination { get; set; }
    }

    public class Vertex
    {
        public Vertex(int key)
        {
            Key = key;
        }

        public int Key { get; set; }
    }

    private static void PrintPath(Vertex vertex, Dictionary<Vertex, Vertex> parents, Dictionary<Vertex, int> path)
    {
        if (vertex == null || !parents.ContainsKey(vertex))
        {
            return;
        }

        PrintPath(parents[vertex], parents, path);
        Console.WriteLine($" {vertex.Key} ({path[vertex]})");
    }

    public class Node
    {
        public Node(Vertex v, int priority)
        {
            V = v;
            Priority = priority;
        }

        public int Priority { get; set; }
        public Vertex V { get; set; }
    }


    public class Graph2
    {
        private int[,] adjMatrix;

        public Graph2(int vertices)
        {
            adjMatrix = new int[vertices, vertices];
        }

        public int[,] AdjMatrix
        {
            get
            {
                return adjMatrix;
            }
        }

        public void AddEdgeDirected(int source, int destination, int weight)
        {
            adjMatrix[source, destination] = weight;
        }

        public void AddEdgeUndirected(int source, int destination, int weight)
        {
            adjMatrix[source, destination] = weight;
            adjMatrix[destination, source] = weight;
        }
    }

    private static Dictionary<int, int> outerParents2;

    public static int[] DijkstraShortestPathMatrix(Graph2 graph, int source)
    {
        var parents = new Dictionary<int, int>();
        var numV = graph.AdjMatrix.GetLength(0);
        var visited = new HashSet<int>();
        var q = new Queue<int>();
        var weights = new int[numV];

        for (int i = 0; i < numV; i++)
        {
            weights[i] = int.MaxValue;
        }

        weights[source] = 0;
        q.Enqueue(source);
        parents.Add(source, -1);

        for (int i = 0; i < numV; i++)
        {
            // pick the vertex with min distance
            // just like a pq for adj list, need to work in order of priority
            var u = GetMinWeightVertex(weights, visited);
            visited.Add(u);

            for (int j = 0; j < numV; j++)
            {
                if (graph.AdjMatrix[u, j] > 0 && !visited.Contains(j))
                {
                    var edgeWeight = graph.AdjMatrix[u, j];
                    var calcWeight = weights[u] + edgeWeight;
                    var adjWeight = weights[j];

                    // is tense?
                    if (calcWeight < adjWeight)
                    {
                        // relax
                        weights[j] = calcWeight;

                        if (!parents.TryAdd(j, u))
                        {
                            parents[j] = u;
                        }
                    }
                }
            }
        }

        outerParents2 = parents;

        return weights;
    }

    private static int GetMinWeightVertex(int[] weights, HashSet<int> visited)
    {
        var minWeightVertex = -1;
        var minWeight = int.MaxValue;

        for (int i = 0; i < weights.Length; i++)
        {
            if (!visited.Contains(i) && weights[i] <= minWeight)
            {
                minWeight = weights[i];
                minWeightVertex = i;
            }
        }

        return minWeightVertex;
    }

    public static void PrintShortestPathMatrix(Graph2 graph, int source, int dest)
    {
        var path = DijkstraShortestPathMatrix(graph, source);

        PrintPath(dest, outerParents2, path);
    }

    private static void PrintPath(int v, Dictionary<int, int> parents, int[] path)
    {
        if (!parents.ContainsKey(v))
        {
            return;
        }

        PrintPath(parents[v], parents, path);
        Console.WriteLine($"{v} ({path[v]})");
    }

    public static Dictionary<int, int> ShortestPathUnWeightedMatrix(Graph2 graph, int source, int dest)
    {
        var numVertices = graph.AdjMatrix.GetLength(0);
        var parents = new Dictionary<int, int>();
        var visited = new HashSet<int>();
        var q = new Queue<int>();
        visited.Add(source);
        q.Enqueue(source);
        parents.Add(source, -1);

        while (q.Count > 0)
        {
            var current = q.Dequeue();

            for (int i = 0; i < numVertices; i++)
            {
                if (graph.AdjMatrix[current, i] > 0 & !visited.Contains(i))
                {
                    if (!parents.TryAdd(i, current))
                    {
                        parents[i] = current;
                    }

                    if (i == dest)
                    {
                        return parents;
                    }

                    q.Enqueue(i);
                    visited.Add(i);
                }
            }
        }

        return new Dictionary<int, int> { { source, -1 } };
    }

    public static void PrintShortestPathUnWeightedMatrix(Graph2 graph, int source, int dest)
    {
        var parents = ShortestPathUnWeightedMatrix(graph, source, dest);

        PrintPath(dest, parents);
    }

    private static void PrintPath(int v, Dictionary<int, int> parents)
    {
        if (!parents.ContainsKey(v) || parents[v] == -1)
        {
            return;
        }

        PrintPath(parents[v], parents);
        Console.WriteLine($" {v}");
    }

    public static void Main()
    {
        
       
        var undirectedAM = new Graph2(10);

        // 1 --> 2 --> 3 --> 4 --> 7 = 56
        // 1 --> 6 --> 7 = 70

        undirectedAM.AddEdgeUndirected(1, 2, 12);
        undirectedAM.AddEdgeUndirected(2, 3, 12);
        undirectedAM.AddEdgeUndirected(3, 4, 12);
        undirectedAM.AddEdgeUndirected(4, 7, 20);
        undirectedAM.AddEdgeUndirected(1, 5, 12);
        undirectedAM.AddEdgeUndirected(1, 6, 30);
        undirectedAM.AddEdgeUndirected(6, 7, 40);

       
        //var dijkstraAM2 = DijkstraShortestPathMatrix(undirectedAM, 1);
        var shortestAM2 = ShortestPathUnWeightedMatrix(undirectedAM, 1, 7);

        PrintShortestPathMatrix(undirectedAM, 1, 3);
    }
}