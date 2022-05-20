using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graph
{
    public class Edge
    {
       public int source;
       public int destination;
       public int weight;

        public Edge(int source, int destination, int weight)
        {
            this.source = source;
            this.destination = destination;
            this.weight = weight;
        }
    }

    public class HeapNode
    {
        public int vertex;
        public int distance;
    }

    public class Graph
    {
        public int vertices;
        LinkedList<Edge>[] adjacencylist;

        public Graph(int vertices)
        {
            this.vertices = vertices;
            adjacencylist = new LinkedList<Edge>[vertices];
            //initialize adjacency lists for all the vertices
            for (int i = 0; i < vertices; i++)
            {
                adjacencylist[i] = new LinkedList<Edge>();
            }
        }

        public void addEdge(int source, int destination, int weight)
        {
            Edge edge = new Edge(source, destination, weight);
            adjacencylist[source].AddFirst(edge);

            edge = new Edge(destination, source, weight);
            adjacencylist[destination].AddFirst(edge); //for undirected graph
        }

        public void dijkstra_GetMinDistances(int sourceVertex)
        {
            int INFINITY = int.MaxValue;
            bool[] SPT = new bool[vertices];

            // //create heapNode for all the vertices
            HeapNode[] heapNodes = new HeapNode[vertices];
            for (int i = 0; i < vertices; i++)
            {
                heapNodes[i] = new HeapNode();
                heapNodes[i].vertex = i;
                heapNodes[i].distance = INFINITY;
            }

            //decrease the distance for the first index
            heapNodes[sourceVertex].distance = 0;

            //add all the vertices to the MinHeap
            MinHeap minHeap = new MinHeap(vertices);
            for (int i = 0; i < vertices; i++)
            {
                minHeap.insert(heapNodes[i]);
            }
            //while minHeap is not empty
            while (!minHeap.isEmpty())
            {
                //extract the min
                HeapNode extractedNode = minHeap.extractMin();

                //extracted vertex
                int extractedVertex = extractedNode.vertex;
                SPT[extractedVertex] = true;

                //iterate through all the adjacent vertices
                LinkedList<Edge> list = adjacencylist[extractedVertex];
                for (int i = 0; i < list.Count; i++)
                {
                    Edge edge = list.ElementAt(i);
                    int destination = edge.destination;
                    //only if destination vertex is not present in SPT
                    if (SPT[destination] == false)
                    {
                        ///check if distance needs an update or not
                        //means check total weight from source to vertex_V is less than
                        //the current distance value, if yes then update the distance
                        int newKey = heapNodes[extractedVertex].distance + edge.weight;
                        int currentKey = heapNodes[destination].distance;
                        if (currentKey > newKey)
                        {
                            decreaseKey(minHeap, newKey, destination);
                            heapNodes[destination].distance = newKey;
                        }
                    }
                }
            }
            //print SPT
            printDijkstra(heapNodes, sourceVertex);
        }

        public void decreaseKey(MinHeap minHeap, int newKey, int vertex)
        {

            //get the index which distance's needs a decrease;
            int index = minHeap.indexes[vertex];

            //get the node and update its value
            HeapNode node = minHeap.mH[index];
            node.distance = newKey;
            minHeap.bubbleUp(index);
        }

        public void printDijkstra(HeapNode[] resultSet, int sourceVertex)
        {
            Console.WriteLine("Dijkstra Algorithm: (Adjacency List + Min Heap)");
            for (int i = 0; i < vertices; i++)
            {
                Console.WriteLine("Source Vertex: " + sourceVertex + " to vertex " + +i +
                " distance: " + resultSet[i].distance);
            }
        }
    }

    public class MinHeap
    {
        public int capacity;
        public int currentSize;
        public HeapNode[] mH;
        public int[] indexes; //will be used to decrease the distance


        public MinHeap(int capacity)
        {
            this.capacity = capacity;
            mH = new HeapNode[capacity + 1];
            indexes = new int[capacity];
            mH[0] = new HeapNode();
            mH[0].distance = int.MinValue;
            mH[0].vertex = -1;
            currentSize = 0;
        }

        public void display()
        {
            for (int i = 0; i <= currentSize; i++)
            {
                Console.WriteLine(" " + mH[i].vertex + " distance " + mH[i].distance);
            }
            Console.WriteLine("________________________");
        }

        public void insert(HeapNode x)
        {
            currentSize++;
            int idx = currentSize;
            mH[idx] = x;
            indexes[x.vertex] = idx;
            bubbleUp(idx);
        }

        public void bubbleUp(int pos)
        {
            int parentIdx = pos / 2;
            int currentIdx = pos;
            while (currentIdx > 0 && mH[parentIdx].distance > mH[currentIdx].distance)
            {
                HeapNode currentNode = mH[currentIdx];
                HeapNode parentNode = mH[parentIdx];

                //swap the positions
                indexes[currentNode.vertex] = parentIdx;
                indexes[parentNode.vertex] = currentIdx;
                swap(currentIdx, parentIdx);
                currentIdx = parentIdx;
                parentIdx = parentIdx / 2;
            }
        }

        public HeapNode extractMin()
        {
            HeapNode min = mH[1];
            HeapNode lastNode = mH[currentSize];
            // update the indexes[] and move the last node to the top
            indexes[lastNode.vertex] = 1;
            mH[1] = lastNode;
            mH[currentSize] = null;
            sinkDown(1);
            currentSize--;
            return min;
        }

        public void sinkDown(int k)
        {
            int smallest = k;
            int leftChildIdx = 2 * k;
            int rightChildIdx = 2 * k + 1;
            if (leftChildIdx < heapSize() && mH[smallest].distance > mH[leftChildIdx].distance)
            {
                smallest = leftChildIdx;
            }
            if (rightChildIdx < heapSize() && mH[smallest].distance > mH[rightChildIdx].distance)
            {
                smallest = rightChildIdx;
            }
            if (smallest != k)
            {

                HeapNode smallestNode = mH[smallest];
                HeapNode kNode = mH[k];

                //swap the positions
                indexes[smallestNode.vertex] = k;
                indexes[kNode.vertex] = smallest;
                swap(k, smallest);
                sinkDown(smallest);
            }
        }

        public void swap(int a, int b)
        {
            HeapNode temp = mH[a];
            mH[a] = mH[b];
            mH[b] = temp;
        }

        public bool isEmpty()
        {
            return currentSize == 0;
        }

        public int heapSize()
        {
            return currentSize;
        }
    }
}



