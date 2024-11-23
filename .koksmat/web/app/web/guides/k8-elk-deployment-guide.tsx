import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CodeHighlighterComponent } from "@/components/code-highlighter"
import KoksmatSession from '@/components/koksmat-session'
import KoksmatAction from '@/components/koksmat-action'

interface CodeBlock {
  fileName: string
  language: string
  code: string
}

interface Section {
  title: string
  content: React.ReactNode
  codeBlocks: CodeBlock[]
}

const ELKonAKSGuide: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({})
  const [namespace, setNamespace] = useState<string>('elk')
  const [sections, setSections] = useState<Section[]>([])

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const updateNamespace = (newNamespace: string) => {
    setNamespace(newNamespace)
  }

  const replaceNamespace = (code: string): string => {
    return code.replace(/namespace: elk/g, `namespace: ${namespace}`)
  }

  useEffect(() => {
    const updatedSections: Section[] = [
      {
        title: "1. Create a StorageClass for AKS",
        content: (
          <>
            <p className="mb-2">Create a custom StorageClass for Azure Disks:</p>
          </>
        ),
        codeBlocks: [
          {
            fileName: "azure-disk-storageclass.yaml",
            language: "yaml",
            code: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: managed-standard
provisioner: kubernetes.io/azure-disk
parameters:
  skuName: Standard_LRS
reclaimPolicy: Delete
volumeBindingMode: Immediate`
          },
          {
            fileName: "apply-storageclass.ps1",
            language: "powershell",
            code: `Set-Location $PSScriptRoot
kubectl apply -f azure-disk-storageclass.yaml`
          }
        ]
      },
      {
        title: "2. Deploy Elasticsearch",
        content: (
          <>
            <p className="mb-2">Create the following YAML files for Elasticsearch:</p>
          </>
        ),
        codeBlocks: [
          {
            fileName: "elasticsearch-statefulset.yaml",
            language: "yaml",
            code: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch
  namespace: ${namespace}
spec:
  serviceName: elasticsearch
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      securityContext:
        fsGroup: 1000
      containers:
      - name: elasticsearch
        image: docker.elastic.co/elasticsearch/elasticsearch:8.6.0
        ports:
        - containerPort: 9200
          name: http
        - containerPort: 9300
          name: transport
        env:
        - name: discovery.type
          value: "single-node"
        - name: cluster.routing.allocation.disk.watermark.high
          value: "90%"
        - name: cluster.routing.allocation.disk.watermark.flood_stage
          value: "95%"
        - name: cluster.routing.allocation.disk.watermark.low
          value: "85%"
        - name: action.auto_create_index
          value: "true"
        securityContext:
          runAsUser: 1000
        volumeMounts:
        - name: elasticsearch-storage
          mountPath: /usr/share/elasticsearch/data
  volumeClaimTemplates:
  - metadata:
      name: elasticsearch-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "managed-standard"
      resources:
        requests:
          storage: 10Gi
        limits:
          storage: 50Gi`
          },
          {
            fileName: "elasticsearch-service.yaml",
            language: "yaml",
            code: `apiVersion: v1
kind: Service
metadata:
  name: elasticsearch
  namespace: ${namespace}
spec:
  ports:
  - port: 9200
    name: http
  - port: 9300
    name: transport
  selector:
    app: elasticsearch`
          },
          {
            fileName: "deploy-elasticsearch.ps1",
            language: "powershell",
            code: `Set-Location $PSScriptRoot
kubectl create namespace ${namespace}
kubectl apply -f elasticsearch-statefulset.yaml
kubectl apply -f elasticsearch-service.yaml`
          }
        ]
      },
      {
        title: "3. Deploy Logstash",
        content: (
          <>
            <p className="mb-2">Create the following YAML files for Logstash:</p>
          </>
        ),
        codeBlocks: [
          {
            fileName: "logstash-deployment.yaml",
            language: "yaml",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: logstash
  namespace: ${namespace}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: logstash
  template:
    metadata:
      labels:
        app: logstash
    spec:
      containers:
      - name: logstash
        image: docker.elastic.co/logstash/logstash:8.6.0
        ports:
        - containerPort: 5044
          name: beats
        - containerPort: 9600
          name: monitoring
        volumeMounts:
        - name: config-volume
          mountPath: /usr/share/logstash/pipeline/
      volumes:
      - name: config-volume
        configMap:
          name: logstash-config`
          },
          {
            fileName: "logstash-configmap.yaml",
            language: "yaml",
            code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: logstash-config
  namespace: ${namespace}
data:
  logstash.conf: |
    input {
      tcp {
        port => 5000
        codec => json_lines
      }
    }
    output {
      elasticsearch {
        hosts => ["http://elasticsearch:9200"]
        index => "logs-%{+YYYY.MM.dd}"
      }
    }`
          },
          {
            fileName: "logstash-service.yaml",
            language: "yaml",
            code: `apiVersion: v1
kind: Service
metadata:
  name: logstash
  namespace: ${namespace}
spec:
  ports:
  - port: 5000
    name: tcp-input
  - port: 9600
    name: monitoring
  selector:
    app: logstash`
          },
          {
            fileName: "deploy-logstash.ps1",
            language: "powershell",
            code: `Set-Location $PSScriptRoot
kubectl apply -f logstash-configmap.yaml
kubectl apply -f logstash-deployment.yaml
kubectl apply -f logstash-service.yaml`
          }
        ]
      },
      {
        title: "4. Deploy Kibana",
        content: (
          <>
            <p className="mb-2">Create the following YAML files for Kibana:</p>
          </>
        ),
        codeBlocks: [
          {
            fileName: "kibana-deployment.yaml",
            language: "yaml",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: kibana
  namespace: ${namespace}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kibana
  template:
    metadata:
      labels:
        app: kibana
    spec:
      containers:
      - name: kibana
        image: docker.elastic.co/kibana/kibana:8.6.0
        ports:
        - containerPort: 5601
        env:
        - name: ELASTICSEARCH_HOSTS
          value: "http://elasticsearch:9200"`
          },
          {
            fileName: "kibana-service.yaml",
            language: "yaml",
            code: `apiVersion: v1
kind: Service
metadata:
  name: kibana
  namespace: ${namespace}
spec:
  ports:
  - port: 5601
    name: web
  selector:
    app: kibana`
          },
          {
            fileName: "deploy-kibana.ps1",
            language: "powershell",
            code: `Set-Location $PSScriptRoot
kubectl apply -f kibana-deployment.yaml
kubectl apply -f kibana-service.yaml`
          }
        ]
      },
      {
        title: "5. Access Kibana",
        content: (
          <>
            <p className="mb-2">To access Kibana from outside the cluster, you can use a NodePort service:</p>
          </>
        ),
        codeBlocks: [
          {
            fileName: "kibana-nodeport.yaml",
            language: "yaml",
            code: `apiVersion: v1
kind: Service
metadata:
  name: kibana-nodeport
  namespace: ${namespace}
spec:
  type: NodePort
  ports:
  - port: 5601
    nodePort: 30001
    name: web
  selector:
    app: kibana`
          },
          {
            fileName: "apply-kibana-nodeport.ps1",
            language: "powershell",
            code: `Set-Location $PSScriptRoot
kubectl apply -f kibana-nodeport.yaml`
          }
        ]
      },
      {
        title: "6. Backup Mechanism for Elasticsearch",
        content: (
          <>
            <p className="mb-2">To set up a snapshot repository for backups:</p>
          </>
        ),
        codeBlocks: [
          {
            fileName: "create-snapshot-repository.json",
            language: "json",
            code: `PUT _snapshot/my_backup
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups"
  }
}`
          },
          {
            fileName: "restore-snapshot.json",
            language: "json",
            code: `POST _snapshot/my_backup/snapshot_1/_restore`
          }
        ]
      },
      {
        title: "7. Continuous Backup with Long-Term Storage",
        content: (
          <p>Consider using Elasticsearch Curator or custom cron jobs to take snapshots regularly and offload them to another storage, such as Azure Blob Storage or AWS S3.</p>
        ),
        codeBlocks: []
      }
    ]

    setSections(updatedSections)
  }, [namespace])

  return (
    <div className="container mx-auto p-4 relative">




      <h1 className="text-3xl font-bold mb-6">ELK Deployment for AKS</h1>
      <p className="mb-4">This guide will help you deploy the Elasticsearch, Logstash, and Kibana (ELK) stack on Azure Kubernetes Service (AKS).</p>

      <div className="mb-6">
        <Label htmlFor="namespace">Namespace:</Label>
        <Input
          id="namespace"
          value={namespace}
          onChange={(e) => updateNamespace(e.target.value)}
          placeholder="Enter namespace"
          className="mt-1"
        />
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <Button
            className="w-full justify-between"
            variant="outline"
            onClick={() => toggleSection(index)}
          >
            <span>{section.title}</span>
            {expandedSections[index] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {expandedSections[index] && (
            <Card className="mt-2">
              <CardContent className="pt-4">
                {section.content}
                {section.codeBlocks.map((block, blockIndex) => (
                  <div key={blockIndex} className="mb-4">
                    <h3 className="text-lg font-semibold mt-4 mb-2">{block.fileName}</h3>
                    <div className="relative">
                      <CodeHighlighterComponent language={block.language} theme="nightOwl">
                        {replaceNamespace(block.code)}
                      </CodeHighlighterComponent>
                      <div className="absolute top-2 right-2">
                        <KoksmatAction
                          fileName={block.fileName}
                          fileContent={replaceNamespace(block.code)}
                          executeCommand=""
                          showClipboard={true}
                          showSaveFile={true}
                          showOpenInCode={true}
                          showExecuteFile={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  )
}

export default ELKonAKSGuide